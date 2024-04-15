import { CreateTodayDate } from "./FormatDate";
import CheckWeatherSVG from "./CheckWeatherSVG";
import { weatherCodes } from "../../data/weather-codes";
import React from "react";
export type currentWeatherType = {
  time: string;
  weather_code: number;
  weather_code_des: string;
  wind_speed: number;
  wind_speed_unit: string;
  temperature_2m: number;
  temp_unit: string;
};
export function CreateCurrentWeatherHTML({
  weatherData,
}: {
  weatherData: currentWeatherType;
}) {
  if (typeof weatherData === "undefined") {
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
  let date = <CreateTodayDate />;
  let temp: string = "undefined temp";
  let wind: string = "undefined wind info";
  let wDesc: string = "";
  if (typeof weatherData == "object") {
    wDesc =
      typeof weatherCodes[weatherData["weather_code"]] == "undefined"
        ? "undefined data"
        : weatherData["weather_code_des"];

    if (
      typeof weatherData["temperature_2m"] != "undefined" &&
      typeof weatherData["temp_unit"] != "undefined"
    ) {
      temp = weatherData["temperature_2m"] + weatherData["temp_unit"];
    }
    if (
      typeof weatherData["wind_speed"] != "undefined" &&
      typeof weatherData["wind_speed_unit"] != "undefined"
    ) {
      wind = weatherData["wind_speed"] + weatherData["wind_speed_unit"];
    }
  }
  return (
    <section className="current_forecast_container">
      <header className="w-full text-black font-sans text-x2 font-bold self-center mb-3">
        Current Weather
      </header>
      <div className="flex">
        <div className="current_forecast w-full">
          <CheckWeatherSVG code={weatherData["weather_code"]} />
          <div className="current_temp text-black font-sans text-4xl font-bold mb-1">
            {temp}
          </div>
          <div className="daily_date text-black font-sans text-x1 font-bold mb-3">
            {date}
          </div>
          <div className="current_weather_code pb-4 border-b mb-4">{wDesc}</div>
          <div className="current_wind">
            <svg
              className="inline-block pr-2"
              width="25px"
              height="25px"
              viewBox="-5.7 -5.7 41.40 41.40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#f26418"
              stroke="#f26418"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="0.3"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <title>wind-flag</title> <desc>Created with Sketch Beta.</desc>
                <defs> </defs>
                <g
                  id="Page-1"
                  strokeWidth="0.00030000000000000003"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Icon-Set-Filled"
                    transform="translate(-467.000000, -778.000000)"
                    fill="#ff0000"
                  >
                    <path
                      d="M495,780 L491,779.637 L491,791.363 L495,791 C496.104,791 497,790.104 497,789 L497,782 C497,780.896 496.104,780 495,780 L495,780 Z M483,792.091 L489,791.546 L489,779.455 L483,778.909 L483,792.091 L483,792.091 Z M471,780 L471,791 C471,792.104 471.896,793 473,793 L481,792.272 L481,778.728 L473,778 C471.896,778 471,778.896 471,780 L471,780 Z M468,778 C467.447,778 467,778.448 467,779 L467,807 C467,807.553 467.447,808 468,808 C468.553,808 469,807.553 469,807 L469,779 C469,778.448 468.553,778 468,778 L468,778 Z"
                      id="wind-flag"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            Wind speed: {wind}
          </div>
        </div>
      </div>
    </section>
  );
}
