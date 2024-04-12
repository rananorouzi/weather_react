
export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
type  buttonClassNamesType = {
  active: string,
  deactive: string
}
export const buttonClassNames : buttonClassNamesType = {
  active: "bg-blue-500 text-white",
  deactive: "text-slate-900 bg-white",
};
export  const weatherParams = {
  latitude: "65.01",
  longitude: "25.47",
  current: "temperature_2m,weather_code,wind_speed_10m",
  hourly: "temperature_2m",
  daily: "weather_code,temperature_2m_max,temperature_2m_min",
  models: "best_match",
  temperature_unit: "",
};
/*
export const weatherUrlGenerate = (tmp : string) =>
  {
  let url = "https://api.open-meteo.com/v1/forecast";
  const weatherParams = {
    latitude: "65.01",
    longitude: "25.47",
    current: "temperature_2m,weather_code,wind_speed_10m",
    hourly: "temperature_2m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    models: "best_match",
    temperature_unit: "",
  };
  if (tmp === "f") {
    weatherParams.temperature_unit = "fahrenheit";
  }
  return url =
  url +
    "?" +
    Object.keys(weatherParams)
      .map(function (key) {
        if ((weatherParams as any)[key] !== "") {
          return key + "=" + encodeURIComponent((weatherParams as any)[key]);
        }
        return "";
      })
      .join("&");
  }*/