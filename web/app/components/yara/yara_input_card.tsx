"use client";
import { YaraRuleCreateRespone } from "@customTypes/yara/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
    await fetch("/api/yara/file/create", {
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
    <div className="focus:ring-brand-300 items-left flex w-full max-w-full flex-col justify-start rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
      <h1 className="mb-4 block text-lg font-bold text-gray-800 sm:text-lg">
        Yara Rule 조건
      </h1>
      <form onSubmit={handleFormSubmit}>
        <label>Yara Rule 이름</label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={"저장할 이름"}
          className="ml-1 rounded-md border border-gray-200 p-3 shadow-sm focus:outline-none"
        />
        {inputs.map((input, index) => (
          <div key={index} className="w-full max-w-full md:p-1">
            <input
              value={input}
              onChange={(event) => handleInputChange(index, event)}
              placeholder={`입력 ${index + 1}`}
              className="mr-1 w-11/12 border-2 border-dashed border-gray-100 px-2 focus:outline-none focus:ring-1 sm:h-10"
            />

            <MinusCircleOutlined
              className="dynamic-delete-button"
              onClick={() => removeInput(index)}
            />
          </div>
        ))}
        <div className="mt-4 flex justify-between">
          <Button
            type="dashed"
            onClick={() => addInput()}
            icon={<PlusOutlined />}
          >
            입력 추가
          </Button>
          <button
            type="submit"
            className="hover:bg-brand-600 focus:ring-brand-300 bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Yara Rule 생성
          </button>
        </div>
        <p className="text-red-400">{errMessage}</p>
      </form>
    </div>
  );
};

export default InputStringsCard;
