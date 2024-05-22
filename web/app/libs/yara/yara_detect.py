import sys
import yara
import json
import os
import re
import pickle
from dotenv import load_dotenv


def extract_string(path, min_bytes=6):
    with open(os.path.join(path), 'rb') as f:
        file_data = f.read()
        string = set(s.decode().strip().lower() for s in re.findall(
            b"[\x20-\x7e]{" + bytes(str(min_bytes), 'utf-8') + b",}", file_data))

    return set([i for i in string if i != ''])


def detect(file_folder_path, yar_file_path):
    ret = {
        "path": file_folder_path,
        "data": []
    }

    exe_file_list = os.listdir(file_folder_path)
    exe_file_list = [x for x in exe_file_list]
    file_folder_path = file_folder_path.rstrip('/')

    # 다중 yar 파일을 사용할 경우
    # yar_file_list = os.listdir(yar_folder_path)
    # yar_file_list = [x for x in yar_file_list if '.yar' in x]
    # yar_folder_path = yar_folder_path.rstrip('/')
    # for rule in yar_file_list:
    #     rules = yara.compile(filepath=f'{yar_folder_path}/{rule}')
    load_dotenv()
    whitelist_path = os.getenv('PKL_WHITELIST_PATH')

    with open(whitelist_path, 'rb') as f:
        whitelist = pickle.load(f)

    rules = yara.compile(filepath=yar_file_path)
    for i, filename in enumerate(exe_file_list):
        match_data = ''
        strings = extract_string(f'{file_folder_path}/{filename}')
        for string in strings:
            if string not in whitelist:
                match_data += string
        res = rules.match(data=match_data)
        tmp = {
            "id": i,
            "filename": filename
        }
        if res == []:
            tmp["match"] = False
        else:
            tmp['match'] = True

        ret["data"].append(tmp)

    return json.dumps(ret, indent=4)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python yara_detect.py <folder_path> <yara_path>")
        sys.exit(1)
    target_folder = sys.argv[1]
    yara_rule = sys.argv[2]
    print(detect(target_folder, yara_rule))
