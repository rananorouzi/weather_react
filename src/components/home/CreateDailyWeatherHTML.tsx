import CheckWeatherSVG from "./CheckWeatherSVG";
import { weatherCodes } from "../../data/weather-codes";
import React from "react";
import { weekday, months } from "../../data/const-var";
export type weekWeatherType = {
  forecast: {
    [x: string | number]: {
      time: string | number;
      weather_code: number;
      weather_code_des: string;
      min_temp: number;
      max_temp: number;
    };
  };
  unit: {
    max_unit: string;
    min_unit: string;
  };
};
export function CreateDailyWeatherHTML({
  weekWeather,
}: {
  weekWeather: weekWeatherType;
}) {
  if (typeof weekWeather === "undefined") {
    return (
      <>
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2"
          role="alert"
        >
          <strong className="font-bold">Invalid parameter!</strong>
        </div>
      </>
    );
  }
  let html = [];

  let date, objDay, wDesc;
  let minTemp!: string;
  let maxTemp!: string;
  let todayWidth = "";
  let todayDegWidth = "";

  for (let index in weekWeather["forecast"]) {
    if (index === "0") {
      date = "Today";
      todayWidth = "max-xl:col-span-3";
      todayDegWidth = "max-xl:w-2/5 div_center";
    } else {
      objDay = new Date(weekWeather["forecast"][index]["time"]);
      date =
        weekday[objDay.getDay()] +
        ", " +
        months[objDay.getMonth()] +
        " " +
        objDay.getDate();
    }
    if (
      typeof weatherCodes[weekWeather["forecast"][index]["weather_code"]] ==
      "undefined"
    ) {
      wDesc = "undefined data";
    } else {
      wDesc = weekWeather["forecast"][index]["weather_code_des"];
    }
    if (
      typeof weatherCodes[weekWeather["forecast"][index]["weather_code"]] ==
      "undefined"
    ) {
      wDesc = "undefined data";
    }
    if (
      typeof weekWeather["forecast"][index]["max_temp"] != "undefined" &&
      typeof weekWeather["unit"]["max_unit"] != "undefined"
    ) {
      maxTemp =
        weekWeather["forecast"][index]["max_temp"] +
        weekWeather["unit"]["max_unit"];
    }
    if (
      typeof weekWeather["forecast"][index]["min_temp"] != "undefined" &&
      typeof weekWeather["unit"]["min_unit"] != "undefined"
    ) {
      minTemp =
        weekWeather["forecast"][index]["min_temp"] +
        weekWeather["unit"]["min_unit"];
    }
    html.push(
      <div
        key={index}
        className={
          "max-sm:mb-2 text-center daily_forecast p-3 h-full border border-gray-200 rounded shadow " +
          todayWidth
        }
      >
        <div className="daily_date font-bold mb-2">{date}</div>
        <CheckWeatherSVG
          code={weekWeather["forecast"][index]["weather_code"] as number}
        />
        <div className="daily_weather_code py-3">{wDesc}</div>
        <div
          className={"daily_temp text-sm flex justify-between " + todayDegWidth}
        >
          <span className="max text-gray-800 max-md:inline-block">
            {maxTemp}
          </span>
          <span className="min text-gray-400 pl-3 max-md:pl-0">{minTemp} </span>
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
