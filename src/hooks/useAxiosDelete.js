import axios from "axios";
import { useState } from "react";

export const useAxiosDelete = (
  url = "",
  message = "",
  navigate = "",
  session = false
) => {
  const [error, setError] = useState("");

  const handleDelete = async (id) => {
    try {
      let options = session ? { withCredentials: true } : {};
      await axios.delete(id || url, options);
      if (message) {
        alert(message);
      }
      if (navigate) {
        navigate();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return { error, handleDelete };
};
