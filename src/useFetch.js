import { useState, useEffect } from "react";
import { ApiKey } from "./Config";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch(url, {
        method: "get",
        headers: {
          ApiKey: ApiKey,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data from the resource");
          }
          return res.json();
        })
        .then((data) => {
          //console.log(data);
          setData(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 1000);
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
