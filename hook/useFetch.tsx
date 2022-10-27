import { useState, useEffect } from "react";

const useFetch = (url: string, loadAgain: boolean) => {
  const [loading, setLoading] = useState(false);
  const [makes, setMakes] = useState<any[]>([]);
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
        .then((json) => {
          console.log(json);
          setLoading(false);
          setMakes(json.Results);
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
