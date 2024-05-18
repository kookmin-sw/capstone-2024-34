"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Chart2 } from "@customTypes/mock/chart";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const SignatureChart = () => {
  const [sigData, setSigData] = useState<Chart2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/signature/signaturechart`,
          {
            method: "GET",
          },
        );
        const data = await res.json();
        let tmp: Chart2[] = [];
        let etcCount = 0;

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          if (i < 7) {
            tmp.push({
              name: element.signature,
              data: element.count,
            });
          } else {
            etcCount += element.count;
          }
        }
        // tmp.push({ name: "etc", data: etcCount });

        setSigData(tmp);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  const seriesData = sigData.map((data) => data.data);
  const labels = sigData.map((data) => data.name);

  const chartOptions = {
    labels: labels,
    colors: [
      "#b429f9",
      "#9c43f8",
      "#855df7",
      "#6d77f6",
      "#5591f5",
      "#3eabf4",
      "#26c5f3",
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
  };

  return (
    <div className="h-72 w-full">
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        width={"100%"}
        height={"100%"}
        type="pie"
      />
    </div>
  );
};

export default SignatureChart;
