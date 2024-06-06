import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../context/Context";

export const useAxiosPost = (
  url,
  input,
  message = "",
  method = "",
  session = ""
) => {
  const [error, setError] = useState("");

  const { setCurrentUser } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isSessionExist = session ? { withCredentials: true } : "";
      const res = await axios.post(url, input, isSessionExist);
      setCurrentUser(res.data);
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
