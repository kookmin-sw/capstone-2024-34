import sys
import re
import os
import pickle
import json

from dotenv import load_dotenv

from core.MV2 import MV2
from core.JIG import JIG
from core.SG2 import SG2


# string feature extract
def extract_string(path, min_bytes=6):
    with open(os.path.join(path), 'rb') as f:
        file_data = f.read()
        string = set(s.decode().strip().lower() for s in re.findall(
            b"[\x20-\x7e]{" + bytes(str(min_bytes), 'utf-8') + b",}", file_data))

    return set([i for i in string if i != ''])


# return string feature extract list
def genStrFeature(file_path):

    res = []

    file_direc = os.listdir(file_path)

    # print('start: extract string feature')

    for f in file_direc:
        mal_path = os.path.join(file_path, f)
        ret = extract_string(mal_path)
        vec = list(ret)
        res.append(vec)

    # print('end: extract string feature')

    return res


# GIPS
def main(str_feature,
         K, M,  # MV2 파라미터
         thetaJ,  # JIG 파라미터
         vector_size, eps, minpts, hh1_size, hh2_size, ratio  # SG2, AWL 파라미터
         ):

    # print(f'data no: {len(str_feature)}')

    str_feature = list(str_feature)
    for feature in str_feature:
        feature = list(feature)

    # 빅 그룹 식별
    minhashed_virtual_vectors = MV2(
        payloads=str_feature, K=K, M=M)

    big_group_indices = JIG(vectors=minhashed_virtual_vectors, thetaJ=thetaJ)

    big_group_payloads = []
    non_big_group_paylaods = []

    for idx, payload in enumerate(str_feature):
        if idx in big_group_indices:
            big_group_payloads.append(payload)
        else:
            non_big_group_paylaods.append(payload)

    # 시그니처 생성
    cluster_signatures = SG2(payloads=big_group_payloads, vector_size=vector_size,
                             eps=eps, minpts=minpts, hh1_size=hh1_size, hh2_size=hh2_size, ratio=ratio)

    signatures = set()
    for value_list in cluster_signatures.values():
        for i in value_list:
            signatures.add(i[0])

    res = list(signatures)

    return res


# make yara rule contents strings
def genYaraRule(input_list, output, signatures_len):

    yara = "import \"pe\"\n\n"
    yara += f"rule {output}\n"
    yara += "{\n"
    yara += "\tstrings:\n"

    cnt = 0
    for j in input_list:
        if j == "":
            continue
        tmpStr = j.replace('\\', '\\\\')
        tmpStr = tmpStr.replace('\"', '\\\"')
        cnt += 1
        yara += f"\t\t$sig{cnt} = \"{tmpStr}\" nocase\n"

    yara += "\tcondition:\n"
    tmpStr = f"\t\t{signatures_len} of ("
    for i in range(1, cnt):
        tmpStr += f"$sig{i}, "
    tmpStr += f"$sig{cnt})"

    yara += tmpStr
    yara += "\n}"

    return yara


def blockPrint():
    global backupstdout
    backupstdout = sys.stdout
    sys.stdout = open(os.devnull, 'w')


def enablePrint():
    global backupstdout
    sys.stdout = backupstdout


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_string.py <file_path>")
        sys.exit(1)
    # file path
    file_path = sys.argv[1]

    # make string feature
    str_feature_ = genStrFeature(file_path)
    load_dotenv()
    whitelist_path = os.getenv('PKL_WHITELIST_PATH')

    with open(whitelist_path, 'rb') as f:
        whitelist = pickle.load(f)

    str_feature = []
    for res in str_feature_:
        tmp = []
        for string in res:
            if string not in whitelist:
                tmp.append(string)

        str_feature.append(tmp)

    # make signature
    # parameter
    K = 64
    M = 2 ** 14
    thetaJ = 0.6
    window_size = 4
    vector_size = 512
    eps = 0.4
    minpts = 5
    ngram = 4
    hh1_size = 3000
    hh2_size = 3000
    ratio = 0.4
    signatures = main(str_feature, K=K, M=M, thetaJ=thetaJ, vector_size=vector_size,
                      eps=eps, minpts=minpts, hh1_size=hh1_size, hh2_size=hh2_size, ratio=ratio)

    # make yara rule
    signatures_len = 1
    yara_rule = genYaraRule(signatures, "test1", signatures_len)

    f = open(f'{file_path}/my_yara_rule.yar', 'w')
    f.write(yara_rule)

    json_data = json.dumps(
        {"rule": yara_rule, "extractSignature": signatures})
    print(json_data, end='')
