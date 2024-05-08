"use client";
import { YaraRuleCreateRespone } from "@customTypes/yara/api";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface YaraInputFormProps {
  onSubmit: (data: YaraRuleCreateRespone) => void;
}

const InputStringsCard = ({ onSubmit }: YaraInputFormProps) => {
  const [name, setName] = useState<string>("");
  const [inputs, setInputs] = useState<string[]>([]);
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

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] == "") {
        setErrMessage("빈 입력 값은 불가능합니다.");
        return;
      }

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
          onSubmit(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <>
      <div className="items-left flex justify-center">
        <form onSubmit={handleFormSubmit}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={"Yara 룰 이름"}
          ></input>
          {inputs.map((input, index) => (
            <div key={index}>
              <input
                value={input}
                onChange={(event) => handleInputChange(index, event)}
                placeholder={`입력 ${index + 1}`}
              />

              <MinusCircleOutlined
                className="dynamic-delete-button"
                onClick={() => removeInput(index)}
              ></MinusCircleOutlined>
            </div>
          ))}
          <button
            type="button"
            className="hover:bg-brand-600 focus:ring-brand-300 mr-10 bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            onClick={() => addInput()}
          >
            입력 추가
          </button>
          <button
            type="submit"
            className="hover:bg-brand-600 focus:ring-brand-300  bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
          >
            Yara rule 생성
          </button>
          <p>{errMessage}</p>
        </form>
      </div>
    </>
  );
};

export default InputStringsCard;
