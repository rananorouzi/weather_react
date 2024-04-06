import React from "react";

function FormatDateToMonthDay(props: { date: any }) {
  const date = props.date;
  if ((typeof date !== "string" || date === "") && typeof date !== "number") {
    return <></>;
  }
  let d = new Date(date);
  let dateFormatted =
    d.getDate() + " " + d.toLocaleString("default", { month: "long" });
  let hour = d.getHours();
  return dateFormatted + " - " + hour + ":00";
}
function CreateTodayDate() {
  let objToday = new Date();
  let weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = weekday[objToday.getDay()];
  return dayOfWeek + ", " + objToday.getHours() + ":" + objToday.getMinutes();
}
export { FormatDateToMonthDay, CreateTodayDate };
