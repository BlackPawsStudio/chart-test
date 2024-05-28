import type { ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

export const renderToString = (children: ReactNode) => {
  const div = document.createElement("div");

  flushSync(() => {
    createRoot(div).render(children);
  });
  return div.innerHTML;
};

export const generateFormattedDates = (
  month: number,
  year: number,
  days?: ({ value: number; day: number } | undefined)[],
) => {
  const dates = [];

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });
  const formattedDates = dates.map((date) => {
    const formatted = formatter.format(date);
    const [month, dayString] = formatted.split(" ");
    if (!dayString) return null;
    const day = parseInt(dayString, 10);
    const value = days?.find((d) => d?.day === day)?.value ?? null;
    return { date: `${month}, ${day}`, value: value };
  });

  return formattedDates;
};
