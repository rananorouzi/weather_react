import CheckWeatherSVG from "./CheckWeatherSVG";
import { weatherCodes } from "../../data/weather-codes";
import React from "react";

function CreateDailyWeatherHTML(props: { weekWeather: any }) {
  const weatherData = props.weekWeather;
  let html = [];

  if (typeof weatherData == "object") {
    let date, objDay, wDesc;
    let weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (let index in weatherData["forecast"]) {
      let todayWidth = "";
      let todayDegWidth = "";
      let minTemp = "";
      let maxTemp = "";
      if (index === "0") {
        date = "Today";
        todayWidth = "max-xl:col-span-3";
        todayDegWidth = "max-xl:w-2/5 div_center";
      } else {
        objDay = new Date(weatherData["forecast"][index]["time"]);
        date =
          weekday[objDay.getDay()] +
          ", " +
          months[objDay.getMonth()] +
          " " +
          objDay.getDate();
      }
      if (
        typeof weatherCodes[weatherData["forecast"][index]["weather_code"]] ==
        "undefined"
      ) {
        wDesc = "undefined data";
      } else {
        wDesc = weatherData["forecast"][index]["weather_code_des"];
      }
      if (
        typeof weatherCodes[weatherData["forecast"][index]["weather_code"]] ==
        "undefined"
      ) {
        wDesc = "undefined data";
      }
      if (
        typeof weatherData["forecast"][index]["max_temp"] != "undefined" &&
        typeof weatherData["unit"]["max_unit"] != "undefined"
      ) {
        maxTemp =
          weatherData["forecast"][index]["max_temp"] +
          weatherData["unit"]["max_unit"];
      }
      if (
        typeof weatherData["forecast"][index]["min_temp"] != "undefined" &&
        typeof weatherData["unit"]["min_unit"] != "undefined"
      ) {
        minTemp =
          weatherData["forecast"][index]["min_temp"] +
          weatherData["unit"]["min_unit"];
      }
      html.push(
        <div
          key={index}
          className={
            "max-sm:mb-2 text-center daily_forecast p-3 h-full border border-gray-200 rounded shadow " +
            todayWidth
          }
        >
          <div className="daily_date font-bold mb-2">{date}</div>{" "}
          <CheckWeatherSVG
            code={weatherData["forecast"][index]["weather_code"]}
          />
          <div className="daily_weather_code py-3">{wDesc}</div>
          <div
            className={
              "daily_temp text-sm flex justify-between " + todayDegWidth
            }
          >
            <span className="max text-gray-800 max-md:inline-block">
              {" "}
              {maxTemp}
            </span>
            <span className="min text-gray-400 pl-3 max-md:pl-0">
              {minTemp}{" "}
            </span>{" "}
          </div>
        </div>,
      );
    }
    return (
      <section className="daily_forecast_container">
        <header className="w-full text-black font-sans text-x2 font-bold self-center mb-3">
          Weekly Highlight
        </header>
        <div className="sm:grid xl:grid-cols-7 max-xl:grid-cols-3 gap-2 py-2 sm:mb-2 auto-rows-fr">
          {html}
        </div>
      </section>
    );
  }
}
export default CreateDailyWeatherHTML;
