import { YaraRuleCreateRespone } from "@customTypes/yara/api";
import { connect } from "http2";

const YaraRuleResultCard = ({
  success,
  output,
  message,
}: YaraRuleCreateRespone) => {
  const handleDownload = () => {
    // 입력된 텍스트를 Blob 객체로 변환
    const blob = new Blob([output.yara], { type: "text/plain" });
    // Blob 객체를 URL.createObjectURL을 사용하여 다운로드할 수 있는 URL로 변환
    const url = window.URL.createObjectURL(blob);

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
    <div className="focus:ring-brand-300 flex w-full max-w-full flex-col items-start justify-start whitespace-pre-wrap rounded-xl border border-gray-200 bg-white p-4 shadow-sm focus:outline-none focus:ring-4 md:p-5">
      {output.yara != null ? (
        <div>
          <h1 className="mb-4 block text-lg font-bold text-gray-800 sm:text-lg">
            생성된 Yara Rule
          </h1>
          <p>{output.yara}</p>
          <button
            className="hover:bg-brand-600 focus:ring-brand-300 mt-4 bg-neutral-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            onClick={handleDownload}
          >
            Yara Rule 저장
          </button>
        </div>
      ) : (
        <div className="mb-4 block text-lg font-bold text-gray-800 sm:text-lg">
          yara Rule 생성 대기중
        </div>
      )}
    </div>
  );
};
export default YaraRuleResultCard;
