"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AttackChart = () => {
  const [attackCount, setAttackCount] = useState(0);
  const [normalCount, setNormalCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/analyze`,
          {
            method: "GET",
          },
        );
        const data = await res.json();
        let tmpAttack = 0;
        let tmpNormal = 0;

        for (const index in data) {
          const element = data[index];
          if (element.result === 1) {
            tmpAttack += 1;
          } else if (element.result === 0) {
            tmpNormal += 1;
          }
        }
        setAttackCount(tmpAttack);
        setNormalCount(tmpNormal);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  const seriesData = [
    {
      name: "attack",
      data: [attackCount],
    },
    {
      name: "normal",
      data: [normalCount],
    },
  ];
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
    xaxis: {
      // 차트이름
      categories: ["공격여부"],
    },
  };
  return (
    <div className="w-full">
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="bar"
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
};

export default AttackChart;
