import React from "react";
import { weatherCodes } from "../../data/weather-codes";
function CheckWeatherSVG(props: { code: number }) {
  if(Object.entries(props).length === 0){
    return <></>;
  }
  const code = props.code;
  let wIcon;
  if (typeof weatherCodes[code] == "undefined") {
    wIcon = weatherCodes["undefined"]["icon"];
  } else {
    wIcon = weatherCodes[code]["icon"];
  }
  return wIcon;
}
export default CheckWeatherSVG;
