import "../../App.css";
import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { weatherCodes } from "../../data/weather-codes";
import MainHtml from "./MainHtml";
import { formatHourlyData, formatDailyData } from "./FormatData";
import { currentWeatherType } from "./CreateCurrentWeatherHTML";
import { weekWeatherType } from "./CreateDailyWeatherHTML";
import { weatherParams } from "../../data/const-var";
import useCreateGetURL from "../../hooks/useCreateGetURL";

function Weather(): ReactElement {
  type dataType = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      weather_code: string;
      wind_speed_10m: string;
    };
    current: {
      time: string;
      interval: number;
      temperature_2m: number;
      weather_code: number;
      wind_speed_10m: number;
    };
    hourly_units: {
      time: string;
      temperature_2m: string;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
    };
    daily_units: {
      time: string;
      weather_code: string;
      temperature_2m_max: string;
      temperature_2m_min: string;
    };
    daily: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
    };
  };
  const storageTemp: string | null = localStorage.getItem("defaultTemp");
  const defaultTemp: string = storageTemp != null ? storageTemp : "c";

  const [tmp, setTmp] = useState<string>(defaultTemp);
  const [data, setData] = useState<dataType>();
  let currentWeather!: currentWeatherType;
  let weekWeather!: weekWeatherType;
  let hourlyData: Array<Number> = [];
  weatherParams.temperature_unit = tmp === "f" ? "fahrenheit" : "";

  const weatherUrl = useCreateGetURL(weatherParams);
  useEffect(() => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [weatherUrl]);

  if (typeof data !== "undefined" && typeof data["current"] !== "undefined") {
    // create current data
    currentWeather = {
      time: data["current"]["time"],
      weather_code: data["current"]["weather_code"],
      weather_code_des: weatherCodes[data["current"]["weather_code"]]["name"],
      wind_speed: data["current"]["wind_speed_10m"],
      wind_speed_unit: data["current_units"]["wind_speed_10m"],
      temperature_2m: data["current"]["temperature_2m"],
      temp_unit: data["current_units"]["temperature_2m"],
    };
    const dailyData = {
      daily_units: {
        temperature_2m_max: data["daily_units"]["temperature_2m_max"],
        temperature_2m_min: data["daily_units"]["temperature_2m_min"],
      },
      daily: {
        time: data["daily"]["time"],
        temperature_2m_max: data["daily"]["temperature_2m_max"],
        temperature_2m_min: data["daily"]["temperature_2m_min"],
        weather_code: data["daily"]["weather_code"],
      },
    };
    //create daily data
    weekWeather = formatDailyData(dailyData);

    //create data for chart
    hourlyData = formatHourlyData(
      data["hourly"]["time"],
      data["hourly"]["temperature_2m"],
    );
  }
  const onClickTempHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const button = e.target as HTMLButtonElement;
    button.id === "temp_f" ? setTmp("f") : setTmp("c");
  };
  const onClickRefHandler = () => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  const mainHtmlParams = {
    onClickTempHandler: onClickTempHandler,
    onClickRefHandler: onClickRefHandler,
    hourlyData: hourlyData,
    weekWeather: weekWeather,
    currentWeather: currentWeather,
    tmp: tmp,
    weather_url: weatherUrl,
  };
  return <MainHtml params={mainHtmlParams} />;
}

export default Weather;
