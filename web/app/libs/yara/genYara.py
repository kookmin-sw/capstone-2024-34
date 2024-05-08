import sys
import json

def genYaraRule(input, output):
    input = list(input)

    yara = "import \"pe\"\n\n"
    yara += f"rule {output}\n"
    yara += "{\n"
    yara += "\tstrings:\n"

    cnt = 0
    for j in input[0].split(' '):
        if j == "":
            continue
        tmpStr = j.replace('\\', '\\\\')
        tmpStr = tmpStr.replace('\'', '\\\'').replace('\"', '\\\"')
        cnt += 1
        yara += f"\t\t$sig{cnt} = \"{tmpStr}\"\n"

    yara += "\tcondition:\n"
    tmpStr = "\t\t"
    for i in range(1, cnt):
        tmpStr += f"$sig{i} or "
    tmpStr += f"$sig{cnt}"

    yara += tmpStr
    yara += "\n}"

    return yara

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_string.py <file_path>")
        sys.exit(1)
    respone = dict()

    yara = genYaraRule(sys.argv[1: len(sys.argv) - 1], sys.argv[len(sys.argv) - 1])

    respone['yara'] = yara
 
    json_data = json.dumps(respone)
    print(json_data, end='')
