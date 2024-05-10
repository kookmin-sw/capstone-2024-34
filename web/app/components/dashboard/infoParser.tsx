"use client";
import React, { useEffect, useState } from "react";
import Parser, { Item } from "rss-parser";

type CustomItem = { title: string; link: string };

const InfoParser = ({ path = "" }) => {
  const [items, setItems] = useState<CustomItem[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parser = new Parser({
          //   customFields: {
          //     item: ["title", "link"],
          //   },
        });
        const feed = await parser.parseURL("/api/rss"); //path);
        console.log(feed);
        feed.items.forEach((item) => {
          console.log(item.link);
        });
        // setItems(feed.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [path]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.title}: {item.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoParser;
