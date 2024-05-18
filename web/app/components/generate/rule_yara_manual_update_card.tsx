"use client";
import { YaraTokenizerConf } from "@customTypes/yara/monaco_editor";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import { YaraRuleUpdate } from "@customTypes/generate/api";
import { message } from "antd";

const MonacoEditor = dynamic(() => import("react-monaco-editor"), {
  ssr: false,
});

const YaraRuleUpdateCard = ({ id, ruleName, rule }: YaraRuleUpdate) => {
  const [yaraRule, setYaraRule] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    setYaraRule(rule);
  }, [rule]);

  const handleUpdate = async () => {
    const res = await fetch("/api/yara-rule/", {
      method: "PATCH",
      body: JSON.stringify({ id: id, rule: yaraRule, ruleName: ruleName }),
    });
    if (res.ok) {
      messageApi.success("수정 성공!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      messageApi.error("오류 발생");
      const errorData = await res.json();
      console.error("Error uploading to platform:", errorData);
    }
  };

  const handleDelete = async () => {
    const res = await fetch("/api/yara-rule/", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      messageApi.success("삭제 성공!");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } else {
      messageApi.error("오류 발생");
      const errorData = await res.json();
      console.error("Error uploading to platform:", errorData);
    }
  };

  return (
    <div className="flex max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Yara Rule 편집</h2>
      </div>
      {contextHolder}
      <div className="flex h-full min-h-80 flex-col justify-between p-4">
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
            onClick={handleUpdate}
          >
            변경 사항 적용
          </button>
          <div className="w-5" />
          <button
            type="button"
            className="block w-full rounded-lg border border-neutral-600 px-4 py-3 text-sm text-neutral-600 shadow-sm hover:bg-neutral-700 hover:text-white focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            onClick={handleDelete}
          >
            Yara Rule 삭제
          </button>
        </div>
      </div>
    </div>
  );
};
export default YaraRuleUpdateCard;
