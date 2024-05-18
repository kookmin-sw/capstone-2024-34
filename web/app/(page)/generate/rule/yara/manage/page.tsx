"use client";

import { useState } from "react";
import SelectYaraRuleCard from "@components/apply/rule-yara-select-card";
import { YaraRuleCreateRespone, YaraRule } from "@customTypes/generate/api";
import YaraRuleUpdateCard from "@components/generate/rule_yara_manual_update_card";
import { YaraRuleDB } from "@customTypes/yara/db";

export default function YaraRuleDeletePage() {
  const [selectedYaraRule, setSelectedYaraRule] = useState<YaraRuleDB>();
  return (
    <div className="h-full w-full max-w-full space-y-4 overflow-x-hidden px-4 py-4 sm:space-y-6 sm:px-6 sm:py-6">
      <div className="h-full min-h-full w-full">
        {/* 페이지 헤더 */}
        <div className="grid grid-cols-2">
          <header>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Manage Yara Rule DB
            </p>
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
              Yara Rule DB관리
            </h1>
            <p className="mt-2 text-lg text-gray-800"></p>
          </header>
          <div className="place-items-end items-end place-self-end"></div>
        </div>
        <div className="mt-5 grid h-full w-full max-w-full gap-4 rounded-xl sm:gap-6 xl:min-h-80 xl:grid-cols-3">
          <div className="h-full">
            <SelectYaraRuleCard
              selectedYaraRule={selectedYaraRule}
              setSelectedYaraRule={setSelectedYaraRule}
            />
          </div>
          <div className="h-full xl:col-span-2">
            {selectedYaraRule && (
              <YaraRuleUpdateCard
                id={selectedYaraRule?.id || ""}
                ruleName={selectedYaraRule?.rulename || ""}
                rule={selectedYaraRule?.rule || ""}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
