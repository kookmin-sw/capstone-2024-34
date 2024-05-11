import yara
import json
import os

def detect(exe_folder_path,yar_folder_path):
    ret = {
        "path":exe_folder_path,
        "data":[]
    }

    exe_file_list = os.listdir(exe_folder_path)
    exe_file_list = [x for x in exe_file_list if '.exe' in x]
    exe_folder_path = exe_folder_path.rstrip('/')
    yar_file_list = os.listdir(yar_folder_path)
    yar_file_list = [x for x in yar_file_list if '.yar' in x]
    yar_folder_path = yar_folder_path.rstrip('/')

    for rule in yar_file_list:
        rules = yara.compile(filepath=f'{yar_folder_path}/{rule}')

    for i,exe in enumerate(exe_file_list):
        res = rules.match(f'{exe_folder_path}/{exe}')
        tmp = {
            "id":i,
            "filename":exe
        }
        if res == []:
            tmp["attack"] = 0
            tmp["yar"] = []
        else:
            tmp['attack'] = 1
            tmp['yar'] = [str(x) for x in res]
        ret["data"].append(tmp)

    return json.dumps(ret,indent=4)
