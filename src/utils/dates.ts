import type dayjs from "dayjs";
import type { DateVisit } from "../types/DateVisit";

export function getDates(startDate: dayjs.Dayjs, stopDate: dayjs.Dayjs) {
  const dateArray: Array<DateVisit> = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push({ date: currentDate, visits: 0 });
    currentDate = currentDate.add(1, "day");
  }
  return dateArray;
}
