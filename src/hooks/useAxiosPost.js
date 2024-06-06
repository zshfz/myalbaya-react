import axios from "axios";
import { useState } from "react";

export const useAxiosPost = (
  url,
  input,
  message = "",
  method = "",
  session = "",
  setCurrentUser = ""
) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSessionExist = session ? { withCredentials: true } : "";
      const res = await axios.post(url, input, isSessionExist);
      if (setCurrentUser) {
        setCurrentUser(res.data);
      }
      if (message) {
        alert(message);
      }
      if (method) {
        method();
      }
    } catch (error) {
      setError(error.response.data);
    }
  };

  return { error, handleSubmit };
};
