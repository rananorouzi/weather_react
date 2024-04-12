import { weatherCodes } from "../../data/weather-codes";
function CheckWeatherSVG({ code }: { code: number }) {
  let wIcon;
  if (typeof weatherCodes[code] == "undefined") {
    wIcon = weatherCodes["undefined"]["icon"];
  } else {
    wIcon = weatherCodes[code]["icon"];
  }
  return wIcon;
}
export default CheckWeatherSVG;
