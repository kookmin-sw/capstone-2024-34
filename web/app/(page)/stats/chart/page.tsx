"use client";

import Link from "next/link";
import { useState } from "react";
import ApexChart2 from "@components/chart/chart2";
import ApexChart1 from "@components/chart/chart1";
import AttackChart from "@components/chart/AttackChart";

export default function ChartPage() {
  return (
    <div className="h-full w-full max-w-full space-y-4 p-4 sm:space-y-6 sm:p-6">
      <div className="h-full min-h-full w-full">
        {/* 페이지 헤더 */}
        <div className="grid grid-cols-2">
          <header>
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-3xl">
              차트 예시
            </h1>
            <p className="mt-2 text-lg text-gray-800"></p>
          </header>

          <div className="place-items-end items-end place-self-end"></div>
        </div>
        {/* 콘텐츠 영역 */}
        <div>
          <ApexChart1></ApexChart1>
        </div>
        <div>
          <ApexChart2></ApexChart2>
        </div>
        <div>
          <AttackChart />
        </div>
      </div>
    </div>
  );
}
