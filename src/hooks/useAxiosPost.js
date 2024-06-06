import axios from "axios";
import { useState } from "react";

export const useAxiosPost = (url, input, message) => {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(url, input);
      alert(message);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return { error, handleSubmit };
};
