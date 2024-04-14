"use client";

import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { mockWordCloudData } from "../../dashboard/mockData/words";
import { MinMaxPair } from "react-wordcloud";

const options = {
  rotations: 1,
  rotationAngles: [0.0, 0.0] as MinMaxPair,
  fontFamily: "SUIT",
};

const WordCloud = () => {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration(iteration + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [iteration]);

  return (
    <div className="w-full h-full">
      <ReactWordcloud words={mockWordCloudData} options={options} />
    </div>
  );
};

export default WordCloud;
