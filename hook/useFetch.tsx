import { useState, useEffect } from "react";
import { makesArray } from "../types/fetch";

const useFetch = (url: string, loadAgain: boolean) => {
  const [loading, setLoading] = useState(false);
  const [makes, setMakes] = useState<makesArray>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setMakes([]);
    setError("");

    if (url === "") {
      setLoading(false);
      setMakes([]);
    } else {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          setMakes(data.Results);
        })
        .catch((err) => {
          setLoading(false);
          setMakes([]);

          setError("Internal server problem...Please Refresh The Page.");
        });
    }
  }, [url, loadAgain]);
  return { loading, setLoading, makes, error };
};

export default useFetch;
