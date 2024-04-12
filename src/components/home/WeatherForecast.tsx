import "../../App.css";
import React, { ReactElement } from "react";
import { useState } from "react";
import { weatherCodes } from "../../data/weather-codes";
import MainHtml from "./MainHtml";
import { formatHourlyData, formatDailyData } from "./FormatData";
import { currentWeatherType } from "./CreateCurrentWeatherHTML";
import { weekWeatherType } from "./CreateDailyWeatherHTML";
import { weatherParams } from "../../data/const-var";
import useFetch from "../../hooks/useFetch";
import useCreateGetURL from "../../hooks/useCreateGetURL";

function Weather(): ReactElement {
  type dataType = {
    [key: string]: any;
  };
  const storageTemp: string | null = localStorage.getItem("defaultTemp");
  const defaultTemp: string = storageTemp != null ? storageTemp : "c";

  const [tmp, setTmp] = useState(defaultTemp);

  let currentWeather!: currentWeatherType;
  let weekWeather!: weekWeatherType;
  let hourlyData: Array<Number> = [];
  weatherParams.temperature_unit = tmp === "f" ? "fahrenheit" : "";

  const weatherUrl = useCreateGetURL(weatherParams);
  const data: dataType = useFetch(weatherUrl);
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
  const onClickTempHandler = (temp: string) => {
    temp === "f" ? setTmp("f") : setTmp("c");
  };

  const mainHtmlParams = {
    onClickTempHandler: onClickTempHandler,
    hourlyData: hourlyData,
    weekWeather: weekWeather,
    currentWeather: currentWeather,
    tmp: tmp,
    weather_url: weatherUrl,
  };
  return <MainHtml params={mainHtmlParams} />;
}

export default Weather;
