"use client";

import { ApplyYaraRulePeFilesUploadResponse } from "@customTypes/apply/api";
import { YaraRuleDB } from "@customTypes/yara/db";
import { useSession } from "next-auth/react";
import { FormEvent, useRef, useState } from "react";

interface FilesUploadFormProps {
  onSubmit: (data: ApplyYaraRulePeFilesUploadResponse) => void;
  isProgress: boolean;
  setIsProgress: (isProgress: boolean) => void;
  data_yara: YaraRuleDB | undefined;
}

const ApplyRuleFilesPEUploadCard = ({
  onSubmit,
  isProgress,
  setIsProgress,
  data_yara,
}: FilesUploadFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<any>(null);
  // 드래그 상태저장
  const [dragActive, setDragActive] = useState<boolean>(false);
  // input 파일 저장
  const [files, setFiles] = useState<any>([]);
  // 분석 api 호출결과 데이터 저장
  const [data, setData] = useState<ApplyYaraRulePeFilesUploadResponse>();
  // 파일 업로드 개수 제한
  const maxFileCount = 1000;
  // 세션 정보
  const { data: session } = useSession();

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsProgress(true);

    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("upload_file[]", file);
    });

    if (data_yara) {
      formData.append("yara", data_yara.rule);
    }

    await fetch("/api/apply/rule/yara/upload/pe", {
      method: "POST",
      body: formData,
      headers: { Authorization: `${session?.user.accessToken}` },
    })
      .then((res) => res.json())
      .then((responseData: ApplyYaraRulePeFilesUploadResponse) => {
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
      {data?.success ? (
        <div className="focus:ring-brand-300 flex min-h-96 w-full max-w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
          <div role="status">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-8 w-8 stroke-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="sr-only">분석 완료</span>
          </div>

          <div>
            <div className="mt-2 text-neutral-400">파일 분석완료</div>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <form
            id={"multiple_file_upload_form"}
            className={`${
              dragActive ? "bg-blue-400" : "bg-neutral-100"
            }  focus:ring-brand-300 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white p-4 text-center shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-4 md:p-5`}
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
              multiple={true}
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
          </form>
          {files.length != 0 ? (
            <div className="mt-2 w-full">
              <p className="ml-1">
                <span className="text-blue-600">{files.length}개</span>
              </p>
              <div className="mt-1 flex max-h-36 w-full flex-col items-center space-y-2 overflow-y-scroll">
                {files.map((file: File, idx: any) => (
                  <div
                    key={idx}
                    className="flex w-full flex-row space-x-5 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="flex-1 text-base">
                      {file.name} [
                      {Math.round((file.size / (1024 * 1024)) * 100) / 100}MB]
                    </span>
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => removeFile(file.name, idx)}
                    >
                      × 삭제
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="submit"
                form="multiple_file_upload_form"
                className="hover:bg-brand-600 focus:ring-brand-300 mt-3 w-full rounded-lg bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                업로드 하기
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default ApplyRuleFilesPEUploadCard;
