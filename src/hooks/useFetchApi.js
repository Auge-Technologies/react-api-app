import { useEffect, useState } from "react";
import axios from "axios";

const useFetchApi = (url, refreshState) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const uniqueData = response.data.reduce((acc, point) => {
          if (!acc.find((item) => item.name === point.name)) {
            acc.push(point);
          }
          return acc;
        }, []);
        setData(uniqueData);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    fetchData();
  }, [url, refreshState]);

  return { data, error };
};

export default useFetchApi;
