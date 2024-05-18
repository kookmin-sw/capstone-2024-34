"use client";
import dynamic from "next/dynamic";
import React from "react";
import { mockGraphData } from "../../(page)/dashboard/mockData/graph";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TrafficGraph = () => {
  const values = mockGraphData.map((data) => data.count);
  const labels = mockGraphData.map((data) => data.type);

  const chartOptions = {
    series: values,
    labels: labels,
    dataLabels: {
      textAnchor: "middle" as "middle",
      style: {
        colors: ["#fff", "#fff", "#1f2937"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15,
        },
      },
    },
    legend: {
      position: "bottom" as "bottom",
    },
    stroke: {
      width: 4,
      colors: ["rgb(255, 255, 255)"],
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    colors: ["#3b82f6", "#22d3ee", "#e5e7eb", "#a855f7"],
    animations: {
      enabled: true,
      easing: "easeinout",
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {},
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="h-80 w-full">
      <ReactApexChart
        options={chartOptions}
        series={values}
        width={"100%"}
        height={"100%"}
        type="pie"
      />
    </div>
  );
};

export default TrafficGraph;
