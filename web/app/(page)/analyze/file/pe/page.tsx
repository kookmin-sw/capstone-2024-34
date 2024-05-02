"use client";

import FilePeResultCard from "@components/analyze/file_pe_result_card";
import Link from "next/link";
import { useRef, useState } from "react";
import { FormEvent } from "react";

interface InquiryFormSubmitResponse {
  success: boolean;
  message: string;
  data: JSON;
}

export default function AnalyzePeFilePage() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    await fetch("/api/analyze/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data: InquiryFormSubmitResponse) => {
        if (data.success) {
          alert("파일 업로드 성공!");
          if (formRef.current) {
            formRef.current.reset();
          }
          console.log(data);
          setData(data.data);
        } else {
          alert("파일 업로드 실패!");
        }
      })
      .catch((error) => {
        alert("Err");
        console.error("Error:", error);
      });
  }

  const formRef = useRef<HTMLFormElement>(null);
  let [data, setData] = useState<JSON>();
  return (
    <>
      <div className="w-full space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="h-full min-h-full w-full">
          {/* 페이지 헤더 */}
          <div className="grid grid-cols-2">
            <header>
              <p className="mb-2 text-sm font-semibold text-blue-600">
                Analyze PE File
              </p>
              <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
                PE 파일 분석
              </h1>
              <p className="mt-2 text-lg text-gray-800"></p>
            </header>

            <div className="place-items-end items-end place-self-end"></div>
          </div>
          {/* 콘텐츠 영역 */}
          <div className="mt-5 grid w-full max-w-full gap-4 sm:gap-6">
            <div>
              <div>
                <form onSubmit={onSubmit} ref={formRef}>
                  <label
                    htmlFor="upload_file"
                    className="focus:ring-brand-300 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-4 sm:w-auto md:p-5"
                  >
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

                    <p className="mt-2 text-center text-neutral-400">
                      분석을 원하는 파일을 끌어오거나 클릭해 업로드해주세요.
                    </p>
                    <input
                      type="file"
                      name="upload_file"
                      id="upload_file"
                      accept=".acm, .ax, .cpl, .dll, .drv, .efi, .exe, .mui, .ocx, .scr, .sys, .tsp"
                      required={true}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="submit"
                    className="bg-brand-400 hover:bg-brand-600 focus:ring-brand-300 w-full bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 sm:w-auto "
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="grid">
                <div>분석결과</div>
                <FilePeResultCard data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
