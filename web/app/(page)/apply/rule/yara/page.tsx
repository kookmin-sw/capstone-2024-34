"use client";

import { useState } from "react";
import { Steps } from "antd";

import YaraRulePreviewCard from "@components/apply/rule-yara-preview-card";
import SelectYaraRuleCard from "@components/apply/rule-yara-select-card";
import ApplyRuleFilesPEUploadCard from "@components/apply/rule_yara_upload_pe_card";

import { ApplyYaraRulePeFilesUploadResponse } from "@customTypes/apply/api";
import { YaraRuleDB } from "@customTypes/yara/db";

export default function AnalyzePeFilesPage() {
  // Step UI Index 저장
  const [currStepIdx, setCurrStepIdx] = useState(0);
  // STEP1 선택한 Yara Rule 스트링 데이터 저장
  const [selectedYaraRule, setSelectedYaraRule] = useState<YaraRuleDB>();
  // STEP2 업로드한 PE 파일 데이터 저장
  const [filesUploaderdata, setFilesUploaderdata] =
    useState<ApplyYaraRulePeFilesUploadResponse>();
  // STEP2 업로더 진행 상태 저장
  const [isUploaderProgress, setIsUploaderProgress] = useState(false);

  const handleNextBtn = () => {
    setCurrStepIdx(currStepIdx + 1);
  };

  const handlePrevBtn = () => {
    setCurrStepIdx(currStepIdx - 1);
  };

  const steps = [
    {
      title: "Yara Rule 선택",
      content: "First-content",
    },
    {
      title: "비교 대상 파일 업로드",
      content: "Second-content",
    },
    {
      title: "결과 확인",
      content: "Last-content",
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  function handleUploaderResponse(
    responseData: ApplyYaraRulePeFilesUploadResponse,
  ) {
    setFilesUploaderdata(responseData);
    console.log("res", filesUploaderdata);
  }

  function handleNextStep() {}

  return (
    <div className="overflow-x- h-full w-full max-w-full space-y-4 px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      <div className="h-full min-h-full w-full">
        {/* 페이지 헤더 */}
        <div className="grid grid-cols-2">
          <header>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Apply Yara Rule
            </p>
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
              Yara Rule 적용
            </h1>
            <p className="mt-2 text-lg text-gray-800"></p>
          </header>

          <div className="place-items-end items-end place-self-end"></div>
        </div>
        {/* 콘텐츠 영역 */}
        <div className="mt-5 grid w-full max-w-full gap-4 sm:gap-6">
          <Steps current={currStepIdx} items={items} />
          <div>
            {currStepIdx === 0 && (
              <div id="step1_contents">
                <div className="grid min-h-72 w-full max-w-full gap-4 rounded-xl sm:gap-6 xl:grid-cols-3">
                  <div className="h-full">
                    <SelectYaraRuleCard
                      selectedYaraRule={selectedYaraRule}
                      setSelectedYaraRule={setSelectedYaraRule}
                    />
                  </div>
                  <div className="h-full xl:col-span-2">
                    <YaraRulePreviewCard
                      success={true}
                      message={"undefined"}
                      data_yara={selectedYaraRule}
                      isProgress={false}
                    />
                  </div>
                </div>
              </div>
            )}

            {currStepIdx === 1 && (
              <div id="step2_contents">
                <div className="grid w-full max-w-full gap-4 rounded-xl sm:gap-6">
                  <ApplyRuleFilesPEUploadCard
                    onSubmit={handleUploaderResponse}
                    isProgress={isUploaderProgress}
                    setIsProgress={setIsUploaderProgress}
                  />
                </div>
              </div>
            )}
            {currStepIdx === 2 && (
              <div id="step3_contents">
                <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4">
                  <h3 className="text-gray-500">Third content</h3>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 flex items-center justify-between gap-x-2">
            {currStepIdx >= 0 && (
              <button
                type="button"
                className="inline-flex items-center gap-x-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handlePrevBtn()}
                disabled={currStepIdx === 0}
              >
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                이전
              </button>
            )}
            {currStepIdx < steps.length - 1 && (
              <button
                type="button"
                className="inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handleNextBtn()}
              >
                다음
                <svg
                  className="size-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            )}

            {currStepIdx === steps.length - 1 && (
              <button
                type="button"
                className="inline-flex items-center gap-x-1 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
              >
                완료
              </button>
            )}
          </div>

          {/* {data?.success === true ? (
            <div className="bg-neutral-200 p-4">
              <p>정상 업로드 성공</p>
              <p>{JSON.stringify(data?.data_yara)}</p>
              <p>{data?.data_uploader?.folderPath}</p>
              <p>{JSON.stringify(data?.data_uploader?.files)}</p>
            </div>
          ) : (
            <></>
          )} */}
        </div>
      </div>
    </div>
  );
}
