"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { mockChart2Data } from "../../(page)/chart/mockData/chart2";

const ApexChart2 = () => {
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
    dataLabels: {
      formatter(
        val: number,
        opts: {
          w: { globals: { labels: { [x: string]: any } } };
          seriesIndex: string | number;
        },
      ) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div>
      <div>
        <ReactApexChart options={options} series={seriesData} type="pie" />
      </div>
    </div>
  );
};

export default ApexChart2;
