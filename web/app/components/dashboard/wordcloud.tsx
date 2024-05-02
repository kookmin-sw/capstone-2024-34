"use client";

import React, { useEffect, useState } from "react";
import ReactWordcloud from "@cyberblast/react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { mockWordCloudData } from "../../(page)/dashboard/mockData/words";
import { MinMaxPair } from "@cyberblast/react-wordcloud";

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
    }, 5000);
    return () => clearInterval(interval);
  }, [iteration]);

  return (
    <div className="w-full max-w-full">
      <ReactWordcloud words={mockWordCloudData} options={options} />
    </div>
  );
};

export default WordCloud;
