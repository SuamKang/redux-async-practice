import { useState, useCallback } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendRequset = useCallback(async (requesetConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requesetConfig.url, {
        method: requesetConfig.url ? requesetConfig.url : "GET",
        headers: requesetConfig.headers ? requesetConfig.headers : {},
        body: requesetConfig.body ? JSON.stringify(requesetConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      console.log(data);
      applyData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequset };
};

export default useFetch;
