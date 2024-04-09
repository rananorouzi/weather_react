import React from "react";
import { FormatDateToMonthDay } from "./FormatDate";
import { weatherCodes } from "../../data/weather-codes";

export const formatHourlyData = (times: any, temps: any) => {
  let hourlyData: Array<Number> = [];
  for (let h in times) {
    (hourlyData as any)[h] = [
      <FormatDateToMonthDay date="hTimes[h]" />,
      temps[h],
    ];
  }
  return hourlyData;
};

export const formatDailyData = (data: { [x: string]: any }) => {
  let weekWeather = {
    forecast: {},
    unit: {
      max_unit: data["daily_units"]["temperature_2m_max"],
      min_unit: data["daily_units"]["temperature_2m_min"],
    },
  };
  const weekTimes = data["daily"]["time"];
  const weekdailys = data["daily"];
  for (let i in weekTimes) {
    (weekWeather as any)["forecast"][i] = {
      time: weekTimes[i],
      weather_code: weekdailys["weather_code"][i],
      weather_code_des: weatherCodes[weekdailys["weather_code"][i]]["name"],
      min_temp: weekdailys["temperature_2m_min"][i],
      max_temp: weekdailys["temperature_2m_max"][i],
    };

  }
  return weekWeather;
};
