import { weekday } from "../../data/const-var";

function FormatDateToMonthDay({ date }: { date: string | number }) {
  let d = new Date(date);
  let dateFormatted =
    d.getDate() + " " + d.toLocaleString("default", { month: "long" });
  let hour = d.getHours();
  return dateFormatted + " - " + hour + ":00";
}
function CreateTodayDate() {
  let objToday = new Date();
  let dayOfWeek = weekday[objToday.getDay()];
  return dayOfWeek + ", " + objToday.getHours() + ":" + objToday.getMinutes();
}
export { FormatDateToMonthDay, CreateTodayDate };
