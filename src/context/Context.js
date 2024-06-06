import { createContext, useState } from "react";

const Context = createContext();

const Provider = ({ children }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <Context.Provider
      value={{
        isToggled,
        setIsToggled,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
