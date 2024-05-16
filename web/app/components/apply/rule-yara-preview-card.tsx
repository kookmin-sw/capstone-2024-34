import { GenYaraRulePeFilesUploadResponse } from "@customTypes/generate/api";
import { YaraRuleDB } from "@customTypes/yara/db";
import { YaraTokenizerConf } from "@customTypes/yara/monaco_editor";
import { YaraRule } from "@prisma/client";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

interface YaraRulePreviewCardProps {
  success: boolean | undefined;
  message: string | undefined;
  data_yara: YaraRuleDB | undefined;
  isProgress: boolean;
}

const YaraRulePreviewCard = ({
  success,
  message,
  data_yara,
}: YaraRulePreviewCardProps) => {
  return (
    <>
      {!data_yara ? (
        <></>
      ) : (
        <div>
          {success === true ? (
            <div className="grid w-full max-w-full gap-4 sm:gap-6">
              <div className="min-h-96 max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="border-b border-gray-200 px-4 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    선택한 Yara Rule
                  </h2>
                </div>
                <MonacoEditor
                  className="w-full py-4"
                  value={data_yara.rule}
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
                    readOnly: true,
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default YaraRulePreviewCard;
