import { useState, useEffect } from "react";

const useFetch = (urlString: string) => {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(urlString)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [urlString]);
  return data;
};

export default useFetch;
