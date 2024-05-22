import os
import re
import sys
import json
import pickle
from dotenv import load_dotenv

# 수정 되어
SIGNATURES = {}

load_dotenv()
pkl_sig_path = os.getenv('PKL_SIG_PATH')

with open(pkl_sig_path, "rb") as f:
    additional_signatures = pickle.load(f)
    SIGNATURES.update(additional_signatures)

# string feature extract


def extract_string(path, min_bytes=6):
    with open(os.path.join(path), 'rb') as f:
        file_data = f.read()
        string = set(s.decode().strip().lower() for s in re.findall(
            b"[\x20-\x7e]{" + bytes(str(min_bytes), 'utf-8') + b",}", file_data))

    return set([i for i in string if i != ''])


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python extract_string.py <file_path>")
        sys.exit(1)

    file_path = sys.argv[1]
    strings = extract_string(file_path)

    respone = dict()

    attack = []
    normal = []

    score = 0
    for string in strings:
        if string in SIGNATURES:
            attack.append(string)
            score += 1
        else:
            normal.append(string)

    respone['score'] = score
    respone['attack'] = attack
    respone['normal'] = normal

    json_data = json.dumps(respone)
    print(json_data, end='')
