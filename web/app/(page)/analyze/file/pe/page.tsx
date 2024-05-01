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
          // if (formRef.current) {
          //   formRef.current.reset();
          // }
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
    <div>
      <div>
        <form className="max-w-sm" onSubmit={onSubmit} ref={formRef}>
          <label htmlFor="upload_file" className="sr-only">
            Choose file
          </label>
          <input
            type="file"
            name="upload_file"
            id="upload_file"
            accept=".acm, .ax, .cpl, .dll, .drv, .efi, .exe, .mui, .ocx, .scr, .sys, .tsp"
            required={true}
            className="block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3
    focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50
   "
          />
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
  );
}
