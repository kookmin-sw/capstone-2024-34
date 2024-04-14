"use client";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import { mockGraphData } from "../../dashboard/mockData/graph";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TrafficGraph: React.FC = () => {
  const values: number[] = mockGraphData.map(
    (mockGraphData) => mockGraphData.count
  );

  const labels: string[] = mockGraphData.map(
    (mockGraphData) => mockGraphData.type
  );

  useEffect(() => {
    const options = {
      series: values,
      labels: labels,
      chart: {
        type: "pie",
      },
      title: {
        show: false,
      },
      dataLabels: {
        textAnchor: "middle",
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
        position: "bottom",
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

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    // Cleanup
    return () => {
      chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="chart"
      className="flex flex-col justify-center items-center h-3/4 w-3/4"
    ></div>
  );
};

export default TrafficGraph;
