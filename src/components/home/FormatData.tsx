import React from "react";
import { FormatDateToMonthDay } from "./FormatDate";
import { weatherCodes } from "../../data/weather-codes";
import { weekWeatherType } from "./CreateDailyWeatherHTML";
export const formatHourlyData = (times: [], temps: []) => {
  let hourlyData: Array<Number> = [];
  for (let h in times) {
    (hourlyData as any)[h] = [
      <FormatDateToMonthDay date="hTimes[h]" />,
      temps[h],
    ];
  }
  return hourlyData;
};
type dailyDataType = {
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  daily: {
    time: {
      [key: number]: string;
    };
    temperature_2m_max: {
      [key: number]: number;
    };
    temperature_2m_min: {
      [key: number]: number;
    };
    weather_code: {
      [key: number]: number;
    };
  };
};
export const formatDailyData = (data: dailyDataType) => {
  let weekWeather: weekWeatherType = {
    forecast: {},
    unit: {
      max_unit: data["daily_units"]["temperature_2m_max"],
      min_unit: data["daily_units"]["temperature_2m_min"],
    },
  };
  const weekTimes = data["daily"]["time"];
  const weekdailys = data["daily"];
  for (let i in weekTimes) {
    weekWeather["forecast"][i] = {
      time: weekTimes[i],
      weather_code: weekdailys["weather_code"][i],
      weather_code_des: weatherCodes[weekdailys["weather_code"][i]]["name"],
      min_temp: weekdailys["temperature_2m_min"][i],
      max_temp: weekdailys["temperature_2m_max"][i],
    };
  }
  return weekWeather;
};
