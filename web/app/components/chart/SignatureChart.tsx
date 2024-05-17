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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/signature/signaturechart", {
          method: "GET",
        });
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
        tmp.push({ name: "etc", data: etcCount });

        setSigData(tmp);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  const seriesData = sigData.map((data) => data.data);
  const labels = sigData.map((data) => data.name);

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
