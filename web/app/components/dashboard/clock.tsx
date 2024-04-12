"use client";
import { useState, useEffect } from "react";
import moment from "moment";

const DigitalClock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = moment(currentDateTime).format(
    "YYYY-MM-DD A hh:mm:ss"
  );

  return (
    <p className="text-2xl text-right font-semibold pb-2">
      {formattedDateTime}
    </p>
  );
};

export default DigitalClock;
