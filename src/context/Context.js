import { createContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  return (
    <Context.Provider
      value={{
        isToggled,
        setIsToggled,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
