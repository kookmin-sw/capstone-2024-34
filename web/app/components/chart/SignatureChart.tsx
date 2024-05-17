"use client";

import dynamic from "next/dynamic";
import { mockChart2Data } from "../../(page)/stats/chart/mockData/chart2";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SignatureChart = () => {
  const seriesData = mockChart2Data.map((data) => data.data);
  const labels = mockChart2Data.map((data) => data.name);

  const options = {
    series: seriesData,
    labels: labels,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: "추출 시그니쳐",
    },
    legend: {
      show: false,
    },
  };

  const chartOptions = {
    series: seriesData,
    labels: labels,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: "추출 시그니쳐",
    },
    legend: {
      show: false,
    },
  };

  return (
    <div>
      <div>
        <ReactApexChart
          options={chartOptions}
          series={seriesData}
          width={"100%"}
          height={"100%"}
          type="pie"
        />
      </div>
    </div>
  );
};

export default SignatureChart;
