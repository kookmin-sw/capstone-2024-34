"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactWordcloud = dynamic(() => import("@cyberblast/react-wordcloud"), {
  ssr: false,
});
import { MinMaxPair } from "@cyberblast/react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import { mockWordCloudData } from "../../(page)/dashboard/mockData/words";

const options = {
  rotations: 1,
  rotationAngles: [0.0, 0.0] as MinMaxPair,
  fontFamily: "SUIT",
};

const WordCloud = ({
  words = mockWordCloudData,
  wordCloudoptions = options,
}) => {
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration(iteration + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [iteration]);

  return (
    <>
      <ReactWordcloud words={words} options={wordCloudoptions} />
    </>
  );
};

export default WordCloud;
