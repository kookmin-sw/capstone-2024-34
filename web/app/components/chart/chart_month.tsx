"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Chart2 } from "@customTypes/mock/chart";
import { set } from "date-fns";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface StatsApiData {
  date: string[];
  count: number[];
}

const MonthChart = () => {
  const [dateList, setDateList] = useState<string[]>([]);
  const [cntAnalyzeList, setCntAnalyze] = useState<number[]>([]);
  const [cntYaraList, setCntYaraList] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const yaraRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/yara-rule/stats`,
          {
            method: "GET",
          },
        );

        const analyzeRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze/stats`,
          {
            method: "GET",
          },
        );

        const yaraData: StatsApiData = await yaraRes.json();
        const analyzeData: StatsApiData = await analyzeRes.json();
        setDateList(yaraData.date);
        setCntAnalyze(analyzeData.count);
        setCntYaraList(yaraData.count);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  const seriesData = [
    {
      name: "YARA",
      data: cntYaraList,
    },
    {
      name: "PE FILE",
      data: cntAnalyzeList,
    },
  ];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: 300,
      type: "area" as "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    series: seriesData,
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight" as "straight",
      width: 2,
    },
    grid: {
      strokeDashArray: 2,
    },
    fill: {
      type: "gradient" as "gradient",
      gradient: {
        type: "vertical" as "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.8,
      },
    },
    xaxis: {
      type: "category" as "category",
      tickPlacement: "on",
      categories: dateList,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        stroke: {
          dashArray: 0,
        },
        dropShadow: {
          enabled: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      labels: {
        align: "left" as "left",
        minWidth: 0,
        maxWidth: 140,
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontWeight: 400,
        },
      },
    },

    responsive: [
      {
        breakpoint: 568,
        options: {
          chart: {
            height: 300,
          },
          labels: {
            style: {
              colors: "#9ca3af",
              fontSize: "11px",
              fontWeight: 400,
            },
            offsetX: -2,
          },
          yaxis: {
            labels: {
              align: "left" as "left",
              minWidth: 0,
              maxWidth: 140,
              style: {
                colors: "#9ca3af",
                fontSize: "11px",
                fontWeight: 400,
              },
            },
          },
        },
      },
    ],
    colors: ["#2563eb", "#9333ea"],
  };

  return (
    <div className="h-80 w-full pb-8">
      <div className="mb-3 flex items-center justify-center gap-x-4 sm:mb-6 sm:justify-end">
        <div className="inline-flex items-center">
          <span className="me-2 inline-block size-2.5 rounded-sm bg-blue-600"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            Yara Rule 생성
          </span>
        </div>
        <div className="inline-flex items-center">
          <span className="me-2 inline-block size-2.5 rounded-sm bg-purple-600"></span>
          <span className="text-[13px] text-gray-600 dark:text-neutral-400">
            PE 파일 분석
          </span>
        </div>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        width={"100%"}
        height={"100%"}
        type="area"
      />
    </div>
  );
};

export default MonthChart;
