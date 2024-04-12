const useCreateGetURL = (urlParams: {}) => {
  let stringUrl: string = "https://api.open-meteo.com/v1/forecast";
  stringUrl =
    stringUrl +
    "?" +
    Object.keys(urlParams)
      .map(function (key) {
        if ((urlParams as any)[key] !== "") {
          return key + "=" + encodeURIComponent((urlParams as any)[key]);
        }
        return "";
      })
      .join("&");
  return stringUrl;
};

export default useCreateGetURL;
