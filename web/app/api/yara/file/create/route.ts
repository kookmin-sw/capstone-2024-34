import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  let inputData = null;
  const inputs = formData.get("inputs");
  if (inputs != null) inputData = inputs.toString().split(" ");

  let yaraName = null;
  const name = formData.get("name");
  if (name != null) yaraName = name.toString();

  if (inputData != null && yaraName != null) {
    let yara_rule = "";
    yara_rule += 'import "pe"\n\n';
    yara_rule += `rule ${yaraName}\n`;
    yara_rule += "{\n";
    yara_rule += "\tstrings:\n";

    let cnt = 0;
    for (let i = 0; i < inputData.length; i++) {
      if (inputData[i] == "") continue;
      cnt += 1;
      yara_rule += `\t\t\$sig${cnt} = \"${inputData[i]}\"\n`;
    }

    yara_rule += "\tcondition:\n";
    let tmpStr = "\t\t";
    for (let i = 1; i < cnt; i++) {
      tmpStr += `\$sig${i} or `;
    }
    tmpStr += `\$sig${cnt}`;
    yara_rule += tmpStr;
    yara_rule += "\n}";

    try {
      return NextResponse.json(
        {
          output: { yara: yara_rule },
          seccuess: true,
          message: "Yara 룰 생성 성공",
        },
        { status: 200 },
      );
    } catch (error) {
      return NextResponse.json(
        { output: error, seccuess: false },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json(
      { output: "예상치 못한 에러", seccuess: false },
      { status: 500 },
    );
  }
}
