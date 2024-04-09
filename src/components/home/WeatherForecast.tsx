import "../../App.css";
import React, { ReactElement } from "react";
import { useState, useEffect } from "react";
import { weatherCodes } from "../../data/weather-codes";
import MainHtml from "./MainHtml";
import { formatHourlyData, formatDailyData } from "./FormatData";

function Weather(): ReactElement {
  type dataType = {
    [key: string]: any;
  };
  const storageTemp: string | null = localStorage.getItem("defaultTemp");
  const defaultTemp: string = storageTemp != null ? storageTemp : "c";

  const [data, setData] = useState<dataType>({});
  const [tmp, setTmp] = useState(defaultTemp);
  let weatherUrl = "https://api.open-meteo.com/v1/forecast";
  const weatherParams = {
    latitude: "65.01",
    longitude: "25.47",
    current: "temperature_2m,weather_code,wind_speed_10m",
    hourly: "temperature_2m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    models: "best_match",
    temperature_unit: "",
  };
  let currentWeather: object = {};
  let weekWeather: object = {};
  let hourlyData: Array<Number> = [];

  if (tmp === "f") {
    weatherParams.temperature_unit = "fahrenheit";
  }
  weatherUrl =
    weatherUrl +
    "?" +
    Object.keys(weatherParams)
      .map(function (key) {
        if ((weatherParams as any)[key] !== "") {
          return key + "=" + encodeURIComponent((weatherParams as any)[key]);
        }
        return "";
      })
      .join("&");

  useEffect(() => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [weatherUrl]);

  if (Object.keys(data).length > 0) {
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

    //create daily data
    weekWeather = formatDailyData(data);

    //create data for chart
    hourlyData = formatHourlyData(
      data["hourly"]["time"],
      data["hourly"]["temperature_2m"],
    );
  }
  const onClickTempHandler = (temp: string) => {
    temp === "f" ? setTmp("f") : setTmp("c");
  };
  const onClickRefHandler = () => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  const buttonClassNames = {
    active: "bg-blue-500 text-white",
    deactive: "text-slate-900 bg-white",
  };
  const mainHtmlParams = {
    onClickTempHandler: onClickTempHandler,
    onClickRefHandler: onClickRefHandler,
    hourlyData: hourlyData,
    weekWeather: weekWeather,
    currentWeather: currentWeather,
    buttonClassNames: buttonClassNames,
    tmp: tmp,
  };
  return <MainHtml params={mainHtmlParams} />;
}

export default Weather;
