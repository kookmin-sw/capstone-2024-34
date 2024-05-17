"use client";
import { YaraRuleCreateRespone } from "@customTypes/generate/api";
import { YaraTokenizerConf } from "@customTypes/yara/monaco_editor";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const YaraRuleResultCard = ({
  success,
  output,
  message,
}: YaraRuleCreateRespone) => {
  const [yaraRule, setYaraRule] = useState("");

  useEffect(() => {
    setYaraRule(output.yara);
  }, [output]);
  const handleLocalDownload = (fileName = "") => {
    // 입력된 텍스트를 Blob 객체로 변환
    const blob = new Blob([yaraRule], { type: "text/plain" });
    // Blob 객체를 URL.createObjectURL을 사용하여 다운로드할 수 있는 URL로 변환
    const url =
      typeof window != undefined ? window.URL.createObjectURL(blob) : "";

    // a 태그를 동적으로 생성하여 다운로드 링크 생성
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.yar`; // 다운로드되는 파일명
    document.body.appendChild(link);

    // a 태그를 클릭하여 다운로드 시작
    link.click();

    // 다운로드 후 a 태그 제거
    document.body.removeChild(link);
  };
  const handlePlatformDownload = () => {};

  return (
    <>
      {output.yara != null ? (
        <div className="flex max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Yara Rule 편집
            </h2>
          </div>

          <div className="flex h-full flex-col justify-between p-4">
            <div>
              <MonacoEditor
                onChange={(event) => setYaraRule(event)}
                className="w-full"
                height={"20rem"}
                value={yaraRule}
                language="yara"
                theme="vs"
                editorWillMount={(monaco) => {
                  monaco.languages.register({ id: "yara" });
                  monaco.languages.setMonarchTokensProvider(
                    "yara",
                    YaraTokenizerConf as any,
                  );
                }}
                options={{
                  fontSize: 14,
                  wordWrap: "on",
                  minimap: { enabled: false },
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="block w-full rounded-lg bg-neutral-600 px-4 py-3 text-sm text-white shadow-sm hover:bg-neutral-700 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => handleLocalDownload(output.ruleName)}
              >
                Yara Rule 내 컴퓨터 다운로드
              </button>
              <div className="w-5" />
              <button
                type="button"
                className="block w-full rounded-lg bg-neutral-600 px-4 py-3 text-sm text-white shadow-sm hover:bg-neutral-700 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                onClick={handlePlatformDownload}
              >
                Yara Rule 플랫폼 업로드
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default YaraRuleResultCard;
