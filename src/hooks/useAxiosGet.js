import axios from "axios";
import { useState, useEffect } from "react";

export const useAxiosGet = (url) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [url]);

  return { data };
};
