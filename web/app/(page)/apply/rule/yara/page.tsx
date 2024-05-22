"use client";

import { useState } from "react";
import { Steps } from "antd";

import YaraRulePreviewCard from "@components/apply/rule_yara_preview_card";
import SelectYaraRuleCard from "@components/apply/rule_yara_select_card";
import ApplyRuleFilesPEUploadCard from "@components/apply/rule_yara_upload_pe_card";

import { ApplyYaraRulePeFilesUploadResponse } from "@customTypes/apply/api";
import { YaraRuleDB } from "@customTypes/yara/db";
import ApplyRuleYaraResultCard from "@components/apply/rule_yara_result_card";

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
                  {isUploaderProgress && (
                    <div className="focus:ring-brand-300 flex min-h-96 w-full max-w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          className="h-8 w-8 animate-spin fill-blue-600 text-gray-200"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                      <div>
                        <div className="mt-2 text-center text-neutral-400">
                          파일 분석중
                        </div>
                        <div className="text-center text-neutral-400">
                          파일에 따라 시간이 소요될 수 있습니다...
                        </div>
                      </div>
                    </div>
                  )}
                  <div className={`${isUploaderProgress && "hidden"}`}>
                    <ApplyRuleFilesPEUploadCard
                      onSubmit={handleUploaderResponse}
                      isProgress={isUploaderProgress}
                      setIsProgress={setIsUploaderProgress}
                      data_yara={selectedYaraRule}
                    />
                  </div>
                </div>
              </div>
            )}
            {currStepIdx === 2 && (
              <div id="step3_contents">
                <div className="grid w-full max-w-full gap-4 rounded-xl sm:gap-6">
                  <ApplyRuleYaraResultCard
                    data_apply_yara={filesUploaderdata?.data_apply_yara}
                  />
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
