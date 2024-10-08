import { GenYaraRulePeFilesUploadResponse } from "@customTypes/generate/api";
import { YaraTokenizerConf } from "@customTypes/yara/monaco_editor";
import dynamic from "next/dynamic";
import { monaco } from "react-monaco-editor";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const AutoGenYaraRuleResultCard = ({
  success,
  message,
  data_uploader,
  data_yara,
  isProgress,
}: GenYaraRulePeFilesUploadResponse & { isProgress: boolean }) => {
  const handleDownload = (ruleString: string) => {
    // 입력된 텍스트를 Blob 객체로 변환
    const blob = new Blob([ruleString], { type: "text/plain" });
    // Blob 객체를 URL.createObjectURL을 사용하여 다운로드할 수 있는 URL로 변환
    const url =
      typeof window != undefined ? window.URL.createObjectURL(blob) : "";

    // a 태그를 동적으로 생성하여 다운로드 링크 생성
    const link = document.createElement("a");
    link.href = url;
    link.download = "yara_rule.yar"; // 다운로드되는 파일명
    document.body.appendChild(link);

    // a 태그를 클릭하여 다운로드 시작
    link.click();

    // 다운로드 후 a 태그 제거
    document.body.removeChild(link);
  };

  return (
    <>
      {isProgress ? (
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
            <div className="mt-2 text-center text-neutral-400">파일 분석중</div>
            <div className="text-center text-neutral-400">
              파일에 따라 시간이 소요될 수 있습니다...
            </div>
          </div>
        </div>
      ) : (
        <>
          {success === true ? (
            <div className="grid w-full max-w-full gap-4 sm:gap-6 lg:grid-cols-3">
              <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    추출 시그니처
                  </h2>
                </div>
                <div className="inline-flex flex-wrap gap-2 p-4">
                  {data_yara?.extractSignature.map((item, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-x-1.5 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-blue-800"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="flex border-b border-gray-200 px-4 py-4">
                  <h2 className="flex-1 text-lg font-semibold text-gray-800">
                    자동 생성 탐지 Yara Rule
                  </h2>
                </div>
                <div className="flex w-full justify-end bg-neutral-50 px-4 py-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200 disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => {
                      handleDownload(data_yara?.rule || "");
                    }}
                  >
                    Yar 파일 다운로드
                  </button>
                </div>
                <MonacoEditor
                  className="my-4 w-full"
                  height="600"
                  value={data_yara?.rule}
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
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default AutoGenYaraRuleResultCard;
