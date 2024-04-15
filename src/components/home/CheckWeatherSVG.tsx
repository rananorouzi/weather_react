import { weatherCodes } from "../../data/weather-codes";
function CheckWeatherSVG({ code }: { code: number }) {
  return typeof weatherCodes[code] == "undefined"
    ? weatherCodes["undefined"]["icon"]
    : weatherCodes[code]["icon"];
}
export default CheckWeatherSVG;
