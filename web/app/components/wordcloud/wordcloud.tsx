"use client";

import React from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { mockWordCloudData } from "../../dashboard/mockData/words";
import { MinMaxPair } from "react-wordcloud";

const options = {
  rotations: 1,
  rotationAngles: [0.0, 0.0] as MinMaxPair,
};

const WordCloud = () => {
  return (
    <div className="w-full">
      <ReactWordcloud words={mockWordCloudData} options={options} />
    </div>
  );
};

export default WordCloud;
