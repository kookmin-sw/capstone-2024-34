import { ApplyYaraPythonAPIResponse } from "@customTypes/apply/api";

interface ApplyRuleYaraResultCardProps {
  data_apply_yara: ApplyYaraPythonAPIResponse | undefined;
}

const ApplyRuleYaraResultCard = ({
  data_apply_yara,
}: ApplyRuleYaraResultCardProps) => {
  const unmatchedFiles = data_apply_yara?.output.data.filter(
    (item) => !item.match,
  );
  const matchedFiles = data_apply_yara?.output.data.filter(
    (item) => item.match,
  );
  const totalFiles = (data_apply_yara?.output.data.length ?? 1) - 1;
  return (
    <div className="grid min-h-72 w-full max-w-full gap-4 rounded-xl sm:gap-6 xl:grid-cols-2">
      <div className="xl:col-span-2">
        <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              전체 검사 대상파일
            </h2>
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start p-4">
            {totalFiles}개
          </div>
        </div>
      </div>

      <div>
        <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">매치된 파일</h2>
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start p-4">
            {matchedFiles?.map((item) => (
              <div key={item.id}>
                <p>{item.filename}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              매치되지 않은 파일
            </h2>
          </div>
          <div className="flex w-full flex-1 flex-col items-start justify-start p-4">
            {unmatchedFiles?.map((item) => (
              <div key={item.id}>
                <p>{item.filename}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyRuleYaraResultCard;
