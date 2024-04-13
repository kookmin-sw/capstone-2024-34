"use client";

import React from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { mockWordCloudData } from "../../dashboard/mockData/words";

const WordCloud = () => {
  return (
    <div style={{ height: 400, width: 600 }}>
      <ReactWordcloud words={mockWordCloudData} />
    </div>
  );
};

export default WordCloud;
