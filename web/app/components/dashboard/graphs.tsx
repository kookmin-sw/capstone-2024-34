'use client'
import dynamic from "next/dynamic";
import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { mockGraphData } from "../../dashboard/mockData/graph";

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const TrafficGraph:React.FC = () => {

  const values:number[] = mockGraphData.map(mockGraphData => mockGraphData.count);
  const labels:string[] = mockGraphData.map(mockGraphData => mockGraphData.type);
    useEffect(() => {
      const options = {
        series: values,
        labels: labels,
        chart: {
          type: 'pie',
        },
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      
      const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  
      // Cleanup
      return () => {
        chart.destroy();
      };
    }, []);
  

  return (
      <div id="chart" className="flex flex-col justify-center items-center h-3/4 w-3/4">
      </div>
  );
};

export default TrafficGraph;
