def genYaraRule(signatures):
    yaras = "import \"pe\"\n\n"
    yaras += f"rule demo\n"
    yaras += "{\n"
    yaras += "\tstrings:\n"

    cnt = 0
    for j in signatures:
        if j == "":
            continue
        if len(j) > 200:
            continue
        if cnt >= 9999:
            break
        tmpStr = j.replace('\\', '\\\\')
        tmpStr = tmpStr.replace('\"', '\\\"')
        cnt += 1
        yaras += f"\t\t$sig{cnt} = \"{tmpStr}\" nocase\n"

    yaras += "\tcondition:\n"
    tmpStr = f"\t\t1 of ("
    for i in range(1, cnt):
        tmpStr += f"$sig{i}, "
    tmpStr += f"$sig{cnt})"

    yaras += tmpStr
    yaras += "\n}"

    return yaras
