"use client";

import InputStringsCard from "@components/generate/rule_yara_manual_input_card";
import YaraRuleResultCard from "@components/generate/rule_yara_manual_result_card";
import { YaraRuleCreateRespone, YaraRule } from "@customTypes/generate/api";
import Link from "next/link";
import { useState } from "react";

export default function CreateYaraRulePage() {
  let [data, setData] = useState<YaraRuleCreateRespone>();

  function handleSubmitResponse(responseData: YaraRuleCreateRespone) {
    setData(responseData);
    console.log("res", data);
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6 h-full w-full max-w-full overflow-x-hidden px-4 py-4 sm:px-6 sm:py-6">
        <div className="h-full min-h-full w-full">
          {/* 페이지 헤더 */}
          <div className="grid lg:grid-cols-2">
            <header>
              <p className="mb-2 text-sm font-semibold text-blue-600">
                Manual Generate Yara Rule
              </p>
              <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
                Yara Rule 수동 생성
              </h1>
              <p className="mt-2 text-lg text-gray-800"></p>
            </header>

            <div className="place-items-end items-end place-self-end"></div>
          </div>
          {/* 콘텐츠 영역 */}
          <div className="mt-5 grid w-full max-w-full gap-4 lg:min-h-[70vh] lg:grid-cols-2">
            <InputStringsCard onSubmit={handleSubmitResponse} />
            <YaraRuleResultCard
              success={data?.success || false}
              message={data?.message || ""}
              output={data?.output || ({} as YaraRule)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
