import { useState } from "react";

const useFetch = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = async (URL, processData, method = 'GET', body) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = method === 'GET' ? await fetch(URL) : await fetch(URL,{
        method,
        body: JSON.stringify(body),
        headers: {
          "Content-Type" : "application/JSON" 
        }
      });
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      if (processData) {
        processData(data);
      }

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return {fetchRequest , isLoading, error};
};

export default useFetch;