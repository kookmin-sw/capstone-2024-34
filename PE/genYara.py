def genYaraRule(input, output):
    input = list(input)

    f = open(f'./res/{output}.yar', 'w')

    f.write("import \"pe\"\n\n")
    f.write(f"rule {output}\n")
    f.write("{\n")
    f.write("\tstrings:\n")

    cnt = 0
    for j in input:
        tmpStr = j.replace('\\', '\\\\')
        tmpStr = tmpStr.replace('\'', '\\\'').replace('\"', '\\\"')
        cnt += 1
        f.write(f"\t\t$sig{cnt} = \"{tmpStr}\"\n")

    f.write("\tcondition:\n")
    tmpStr = "\t\t"
    for i in range(1, cnt):
        tmpStr += f"$sig{i} or "
    tmpStr += f"$sig{cnt}"
    f.write(tmpStr)
    f.write("\n}")
    f.close()
