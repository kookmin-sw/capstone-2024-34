import prisma from "@libs/common/prisma";
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const now = new Date();
  const startOfMonthDate = startOfMonth(now);
  const endOfMonthDate = endOfMonth(now);

  const allDates = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });

  const yara = await prisma.yaraRule.findMany({
    where: {
      createdAt: {
        gte: startOfMonthDate,
        lt: endOfMonthDate,
      },
    },
  });

  const dailyCounts: Record<string, number> = {};
  allDates.forEach((date) => {
    dailyCounts[format(date, "d")] = 0;
  });

  yara.forEach((item) => {
    const date = format(item.createdAt, "d");
    if (dailyCounts[date] !== undefined) {
      dailyCounts[date] += 1;
    }
  });

  const result = {
    date: Object.keys(dailyCounts),
    count: Object.values(dailyCounts),
  };

  return NextResponse.json(result);
}
