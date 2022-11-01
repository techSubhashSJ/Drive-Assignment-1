/**
 * @author Subhash Jadhav
 * @Description This component is a custom hook, used to fetch models of a make selected by user
 * @param {string or null} url: api call string for a selected make
 * @param {boolean} loadAgain: true or false 
 */


import { useState, useEffect } from "react";
import { stringOrNull } from "../types";
import { makesArray } from "../types/fetch";

const useFetch = (url: stringOrNull, loadAgain: boolean) => {
  const [loading, setLoading] = useState(false);
  const [makes, setMakes] = useState<makesArray>([]);
  const [error, setError] = useState<stringOrNull>(null);

  useEffect(() => {
    setMakes([]);
    setError(null);

    if (url === null) {
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
