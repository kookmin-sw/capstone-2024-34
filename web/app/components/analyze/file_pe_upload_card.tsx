"use client";
import { AnalyzePeFileUploadResponse } from "@customTypes/analyze/api";
import { FormEvent, useRef, useState } from "react";

interface FileUploadFormProps {
  onSubmit: (data: AnalyzePeFileUploadResponse) => void;
  isProgress: boolean;
  setIsProgress: (isProgress: boolean) => void;
}

const FilePEUploadCard = ({
  onSubmit,
  isProgress,
  setIsProgress,
}: FileUploadFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<any>(null);
  // 드래그 상태저장
  const [dragActive, setDragActive] = useState<boolean>(false);
  // input 파일 저장
  const [files, setFiles] = useState<any>([]);
  // 분석 api 호출결과 데이터 저장
  const [data, setData] = useState<AnalyzePeFileUploadResponse>();
  // 파일 업로드 개수 제한
  const maxFileCount = 1;

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsProgress(true);

    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("upload_file", file);
    });

    await fetch("/api/analyze/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((responseData: AnalyzePeFileUploadResponse) => {
        onSubmit(responseData);
        if (formRef.current) {
          formRef.current.reset();
        }
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsProgress(false);
      });
  }

  function handleChange(e: any) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);
      if (files.length + e.target.files.length <= maxFileCount) {
        for (let i = 0; i < e.target.files.length; i++) {
          setFiles((prevState: any) => [...prevState, e.target.files[i]]);
        }
      } else {
        alert(`최대 ${maxFileCount}개까지 업로드 가능합니다.`);
      }
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (files.length + e.dataTransfer.files.length <= maxFileCount) {
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
        }
      } else {
        alert(`최대 ${maxFileCount}개까지 업로드 가능합니다.`);
      }
    }
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          className={`${
            dragActive ? "bg-blue-400" : "bg-neutral-100"
          }  focus:ring-brand-300 flex  w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 p-4 text-center shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-4 md:p-5`}
          ref={formRef}
          onSubmit={handleFormSubmit}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            name="upload_file"
            id="upload_file"
            accept=".acm, .ax, .cpl, .dll, .drv, .efi, .exe, .mui, .ocx, .scr, .sys, .tsp"
            ref={inputRef}
            className="hidden"
            onChange={handleChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="h-8 w-8 stroke-neutral-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>

          <p className="pt-2">
            분석을 원하는 파일을 끌어오거나{" "}
            <span
              className="cursor-pointer font-bold text-blue-600"
              onClick={openFileExplorer}
            >
              <u>클릭</u>
            </span>
            해 업로드해주세요.
          </p>

          {files.length != 0 ? (
            <>
              <div className="flex flex-col items-center p-3">
                {files.map((file: any, idx: any) => (
                  <div key={idx} className="flex flex-row space-x-5">
                    <span>{file.name}</span>
                    <span
                      className="cursor-pointer text-red-500"
                      onClick={() => removeFile(file.name, idx)}
                    >
                      삭제
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="hover:bg-brand-600 focus:ring-brand-300  bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                분석하기
              </button>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
};

export default FilePEUploadCard;
