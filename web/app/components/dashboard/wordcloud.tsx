"use client";

import { useEffect, useState } from "react";
import { WordCloudData } from "@customTypes/mock/wordcloud";
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

const WordCloud = ({ wordCloudoptions = options }) => {
  const [signature, setSignature] = useState<WordCloudData[]>([]);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/signature", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        let tmpSig: WordCloudData[] = [];
        for (const element in data) {
          const wordCloudItem: WordCloudData = {
            text: data[element].signature,
            value: Number(element),
          };
          tmpSig.push(wordCloudItem);
        }
        setSignature(tmpSig);
      } catch (err) {
        console.log("Failed to send request");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIteration(iteration + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [iteration]);

  return (
    <>
      <ReactWordcloud words={signature} options={wordCloudoptions} />
    </>
  );
};

export default WordCloud;
