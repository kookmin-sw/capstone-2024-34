"use client";

import dynamic from "next/dynamic";
// import ReactApexChart from "react-apexcharts";
import { mockChart3Data } from "../../(page)/chart/mockData/chart3";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart3 = () => {
  const seriesData = mockChart3Data;
  const chartOptions = {
    series: seriesData,
    dataLabels: {
      // 데이터 라벨, 막대 위 표시
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    plotOptions: {
      // 그래프 막대 설정
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      // 포커스시 뷰 데이터 설정
      shared: true,
      intersect: false,
    },
    xaxis: {
      // 차트이름
      categories: ["공격여부"],
    },
  };
  return (
    <div>
      <div>
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          type="bar"
          height={200}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ApexChart3;
