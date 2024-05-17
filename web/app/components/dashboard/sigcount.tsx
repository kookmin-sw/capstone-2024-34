"use client";

import { useEffect, useState } from "react";

const SigCount = () => {
  const [sigCount, setSigCount] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/signature`,
          {
            method: "GET",
          },
        );
        const data = await res.json();
        setSigCount(data.length);
      } catch (err) {
        console.log("Failed to send request");
      }
    };

    fetchData();
  }, []);

  return <div>{sigCount}</div>;
};

export default SigCount;
