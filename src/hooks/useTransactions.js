import { useEffect, useState } from "react";
import logger from "../logger";

export const useTransactions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/data/transactions.json")
      .then((response) => {
        if (!response.ok) {
          logger.error("Failed to fetch transactions");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        logger.info("Fetching data...")
        setTimeout(() => setLoading(false), [500]);
      })
      .catch((err) => {
        logger.error("Fetch error:", err);
        setError(err.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
