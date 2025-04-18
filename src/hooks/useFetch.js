import { useState, useEffect } from "react";
import getCookies from "@/lib/getCookies";
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(null);
  const token = getCookies("token").value
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    const signal = controller.signal;
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(url, { ...options, signal, headers });
    const fetchData = async () => {
      try {
        // const res = await fetch(url, { ...options, signal });
        const res = await fetch(url, {
          Method: "GET",
          Headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`Fetch error: ${res.statusText}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
