import sys
import yara
import json
import os


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

    rules = yara.compile(filepath=yar_file_path)
    for i, filename in enumerate(exe_file_list):
        res = rules.match(f'{file_folder_path}/{filename}')
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

    print(detect(sys.argv[1], sys.argv[2]))
