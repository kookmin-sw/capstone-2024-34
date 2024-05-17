"use client";

import dynamic from "next/dynamic";
import { mockChart2Data } from "../../(page)/stats/chart/mockData/chart2";
import { useEffect, useState } from "react";
import { Chart2 } from "@customTypes/mock/chart";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SignatureChart = () => {
  const [sigData, setSigData] = useState<Chart2[]>([]);

  // {
  //   name: "Exception",
  //   data: 13364,
  // },
  // {
  //   name: "user32",
  //   data: 11784,
  // },

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/signature", {
          method: "GET",
        });
        const data = await res.json();
        console.log(data);

        for (const index in data) {
          const element = data[index];
          // console.log(element.signature);
        }
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

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
