"use client";
import { YaraRuleCreateRespone } from "@customTypes/generate/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

interface YaraInputFormProps {
  onSubmit: (data: YaraRuleCreateRespone) => void;
}

const InputStringsCard = ({ onSubmit }: YaraInputFormProps) => {
  const [name, setName] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([""]);
  const [errMessage, setErrMessage] = useState<string>("");

  const addInput = () => {
    setErrMessage("");
    const newInputs = [...inputs, ""];
    setInputs(newInputs);
  };

  const removeInput = (index: number) => {
    setErrMessage("");
    if (inputs.length != 0) {
      const newInputs = [...inputs];
      newInputs.splice(index, 1);
      setInputs(newInputs);
    }
  };

  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setErrMessage("");
    const newInputs: string[] = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inputs.length == 0) {
      setErrMessage("입력 값을 넣어 주세요");
      return;
    }

    var pattern = /[\s]/g;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] == "") {
        setErrMessage("빈 입력 값은 불가능합니다.");
        return;
      } else if (pattern.test(inputs[i]) == true) {
        setErrMessage("공백을 포함한 입력 값은 불가능합니다.");
        return;
      }
    }

    setErrMessage("");
    var inputStr = "";
    const formData = new FormData();
    for (let i = 0; i < inputs.length; i++) {
      inputStr += inputs[i];
      inputStr += " ";
    }

    formData.append("inputs", inputStr);
    formData.append("name", name);
    await fetch("/api/generate/rule/yara/manual", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((responseData: YaraRuleCreateRespone) => {
        console.log(responseData);
        onSubmit(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Yara Rule 생성기
        </h2>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex h-full flex-col justify-between p-4"
      >
        <div>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              Yara Rule 이름
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={"규칙 이름 입력"}
              className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              String 규칙 입력
            </label>
            <div className="flex flex-col gap-2">
              {inputs.map((input, index) => (
                <div key={index} className="flex w-full">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => handleInputChange(index, event)}
                    placeholder={`스트링 규칙 입력 ${index + 1}`}
                    className="block w-full rounded-lg rounded-e-none border border-gray-200 px-4 py-3 text-sm shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                  />
                  <div
                    className="inline-flex min-w-fit cursor-pointer items-center rounded-e-md border border-s-0 border-gray-200 bg-gray-50 px-4 hover:bg-gray-200"
                    onClick={() => inputs.length > 1 && removeInput(index)}
                  >
                    <MinusCircleOutlined />
                  </div>
                </div>
              ))}

              <div
                className="group flex w-full cursor-pointer"
                onClick={() => addInput()}
              >
                <div className="block w-full rounded-lg rounded-e-none border border-dashed border-gray-200 px-4 py-3 text-sm text-neutral-600 shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 group-hover:bg-gray-50">
                  규칙 추가
                </div>
                <div className="inline-flex min-w-fit cursor-pointer items-center rounded-e-md border border-s-0 border-dashed border-gray-200 bg-gray-50 px-4 group-hover:bg-gray-200">
                  <PlusCircleOutlined />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-red-400">{errMessage}</p>
          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="block w-full rounded-lg bg-neutral-600 px-4 py-3 text-sm text-white shadow-sm hover:bg-neutral-700 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            >
              Yara Rule 생성
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputStringsCard;
