"use client";
import Link from "next/link";
import ApplyRuleFilesYarUploadCard from "./rule_yara_upload_yar_card";
import { GenYaraRulePeFilesUploadResponse } from "@customTypes/generate/api";
import { useEffect, useState } from "react";
import { YaraRuleDB } from "@customTypes/yara/db";

interface SelectYaraRuleCardProps {
  selectedYaraRule: YaraRuleDB | undefined;
  setSelectedYaraRule: (selectedYaraRule: YaraRuleDB) => void;
}

const SelectYaraRuleCard = ({
  selectedYaraRule,
  setSelectedYaraRule,
}: SelectYaraRuleCardProps) => {
  const [yaraDBData, setYaraDBData] = useState<YaraRuleDB[]>();
  const [isDBDataLoading, setIsDBDataLoading] = useState(true);

  useEffect(() => {
    async function getPlatformYaraRules() {
      try {
        const res = await fetch("http://localhost:3000/api/yara-rule", {
          method: "GET",
        });
        const responseData = await res.json();
        setYaraDBData(responseData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsDBDataLoading(false);
      }
    }

    getPlatformYaraRules();
  }, []);

  return (
    <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Yara Rule 선택</h2>
      </div>
      <div className="flex w-full flex-1 flex-col items-start justify-center">
        <div className="w-full border-b border-gray-200 px-4">
          <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
            <button
              type="button"
              className="active inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm text-gray-500 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-blue-600 hs-tab-active:font-semibold hs-tab-active:text-blue-600"
              id="basic-tabs-item-1"
              data-hs-tab="#basic-tabs-1"
              aria-controls="basic-tabs-1"
              role="tab"
            >
              플랫폼 내 생성 Yara Rule
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm text-gray-500 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 hs-tab-active:border-blue-600 hs-tab-active:font-semibold hs-tab-active:text-blue-600"
              id="basic-tabs-item-2"
              data-hs-tab="#basic-tabs-2"
              aria-controls="basic-tabs-2"
              role="tab"
            >
              새로운 Yara Rule 업로드
            </button>
          </nav>
        </div>

        <div className="h-full w-full">
          <div
            id="basic-tabs-1"
            className="h-full px-4"
            role="tabpanel"
            aria-labelledby="basic-tabs-item-1"
          >
            <ul className="flex h-full flex-col">
              {isDBDataLoading && (
                <li className="flex w-full flex-1 flex-col items-center justify-center">
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
                    <div className="mt-2 text-neutral-400">데이터 로딩중</div>
                  </div>
                </li>
              )}
              {yaraDBData?.map((item, idx) => (
                <li
                  key={`li_${idx}`}
                  className="gap-x-2 border-b border-gray-200 bg-white px-1 py-3 text-sm font-medium text-neutral-800 first:border-t-0 last:border-b-0"
                >
                  <div className="relative flex h-full w-full items-center">
                    <div className="flex ">
                      <input
                        id={`hs-list-group-item-radio-${item.id}`}
                        name="hs-list-group-item-radio"
                        type="radio"
                        className="rounded-full border-gray-200 disabled:opacity-50"
                        onChange={() => setSelectedYaraRule(item)}
                      />
                    </div>
                    <label
                      htmlFor={`hs-list-group-item-radio-${item.id}`}
                      className="ms-3 block w-full text-sm text-gray-600"
                    >
                      <div className="text-xs text-blue-600">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                      <div>{item.rulename}</div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            id="basic-tabs-2"
            className="hidden p-4"
            role="tabpanel"
            aria-labelledby="basic-tabs-item-2"
          >
            <ApplyRuleFilesYarUploadCard
              onSubmit={function (
                data: GenYaraRulePeFilesUploadResponse,
              ): void {
                throw new Error("Function not implemented.");
              }}
              isProgress={false}
              setIsProgress={function (isProgress: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SelectYaraRuleCard;
