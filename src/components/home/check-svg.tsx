import { weatherCodes } from "../../data/weather-codes";
function CheckWeatherSVG(props: { code: number }) {
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
