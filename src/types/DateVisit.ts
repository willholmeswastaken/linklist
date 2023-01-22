import type dayjs from "dayjs";

export type DateVisit = {
  date: dayjs.Dayjs;
  visits: number;
};

export type DisplayDateVisit = {
  date: string;
  visits: number;
};
