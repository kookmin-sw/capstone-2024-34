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
import { fetchData } from "next-auth/client/_utils";

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
        const res = await fetch("/api/signature/wordcloud", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        let tmpSig: WordCloudData[] = [];
        let maxValue: number = data[0].count;
        for (const element in data) {
          let val = data[element].count;
          if (val < maxValue / 10) val = 1;
          else if (val < maxValue / 5) val = 1.5;
          else val = 2;
          const wordCloudItem: WordCloudData = {
            text: data[element].signature,
            value: 10 + Math.random() * val * 90,
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
