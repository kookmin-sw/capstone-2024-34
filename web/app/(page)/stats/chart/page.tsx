"use client";

import Link from "next/link";
import { useState } from "react";
import ApexChart1 from "@components/chart/chart1";
import AttackChart from "@components/chart/AttackChart";
import SignatureChart from "@components/chart/SignatureChart";
import TrafficGraph from "@components/dashboard/graphs";
import WordCloud from "@components/dashboard/wordcloud";

export default function ChartPage() {
  return (
    <div className="h-full w-full max-w-full space-y-4 p-4 sm:space-y-6 sm:p-6">
      <div className="h-full min-h-full w-full">
        {/* 페이지 헤더 */}
        <div className="grid grid-cols-2">
          <header>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              Detect Rule Visualization
            </p>
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
              탐지 통계 시각화
            </h1>
            <p className="mt-2 text-lg text-gray-800"></p>
          </header>

          <div className="place-items-end items-end place-self-end"></div>
        </div>
        {/* 콘텐츠 영역 */}
        <div className="mt-5 grid h-full w-full max-w-full gap-4 rounded-xl sm:gap-6 xl:min-h-80 xl:grid-cols-2">
          <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                탐지 시그니처 비율
              </h2>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center p-4">
              <SignatureChart />
            </div>
          </div>

          <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                공격 탐지 비율
              </h2>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center p-4">
              <AttackChart />
            </div>
          </div>

          <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                탐지 파일 종류
              </h2>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center p-4">
              <TrafficGraph />
            </div>
          </div>

          <div className="flex h-full max-w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-4 py-4">
              <h2 className="text-lg font-semibold text-gray-800">
                주요 탐지 시그니처
              </h2>
            </div>
            <div className="flex w-full flex-1 flex-col items-start justify-center p-4">
              <WordCloud />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
