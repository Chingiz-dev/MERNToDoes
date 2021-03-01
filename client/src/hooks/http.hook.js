import { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useHttp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }
        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();
        if (data === "jwt expired") {
          auth.logout();
          history.push("/");
          console.log(data);
        }
        if (!response.ok) {
          console.log(data);
          throw new Error(data.message || "Somethink went wrong");
        }
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  const clearError = () => setError(null);

  return { loading, request, error, clearError };
};
