"use client";

import dynamic from "next/dynamic";
import { mockChart1Data } from "../../(page)/stats/chart/mockData/chart1";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart1 = () => {
  const seriesData = mockChart1Data;

  const options = {
    chart: {
      stacked: true,
      stackType: "100%" as "100%", // 100% 타입 주면 구현되는데 option에서 에러띄움
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "yara 공격 감지 비율",
    },
    xaxis: {
      categories: ["file1", "file2", "file3", "file4", "file5"],
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div>
      <div>
        <ReactApexChart
          options={options}
          series={seriesData}
          type="bar"
          height={350}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ApexChart1;
