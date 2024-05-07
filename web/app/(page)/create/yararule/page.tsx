"use client";

import InputStringsCard from "@components/yara/yara_input_card";
import FilePEUploadCard from "@components/analyze/file_pe_upload_card";
import {
  AnalyzePeFileUploadResponse,
  FilePeResultResponse,
} from "@customTypes/analyze/api";
import Link from "next/link";
import { useState } from "react";

export default function AnalyzePeFilePage() {
  let [data, setData] = useState<string[]>([]);

  function handleSubmitResponse(responseData: string[]) {
    setData(responseData);
    console.log("res", data);
  }

  return (
    <>
      <div className="w-full max-w-full space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="h-full min-h-full w-full">
          {/* 페이지 헤더 */}
          <div className="grid grid-cols-2">
            <header>
              <p className="mb-2 text-sm font-semibold text-blue-600">
                Create Yara rule
              </p>
              <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
                Yara 룰 생성
              </h1>
              <p className="mt-2 text-lg text-gray-800"></p>
            </header>

            <div className="place-items-end items-end place-self-end"></div>
          </div>
          {/* 콘텐츠 영역 */}
          <div className="mt-5 grid w-full max-w-full grid-cols-2 gap-4">
            <InputStringsCard onSubmit={handleSubmitResponse} />
            {/* <FilePEUploadCard
              succcess={data?.succcess || false}
              message={data?.message || ""}
              data={data?.data || nullFileData}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
