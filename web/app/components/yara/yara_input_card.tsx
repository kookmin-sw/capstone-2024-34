"use client";
import { AnalyzePeFileUploadResponse } from "@customTypes/analyze/api";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

interface YaraInputFormProps {
  onSubmit: (data: string[]) => void;
}

const InputStringsCard = ({ onSubmit }: YaraInputFormProps) => {
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

      const formData = new FormData();
      await fetch("/api/yara/file/create", {
        method: "POST",
        body: inputs,
      })
        .then((res) => res.json())
        .then((responseData: string[]) => {
          onSubmit(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      onSubmit(inputs);
    }

    console.log(inputs);

    // const formData = new FormData();
    // files.forEach((file: File) => {
    //   formData.append("upload_file", file);
    // });

    // await fetch("/api/analyze/file/upload", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((responseData: AnalyzePeFileUploadResponse) => {
    //     onSubmit(responseData);
    //     if (formRef.current) {
    //       formRef.current.reset();
    //     }
    //     setData(responseData);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }

  return (
    <>
      <div className="items-left flex justify-center">
        <form onSubmit={handleFormSubmit}>
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
