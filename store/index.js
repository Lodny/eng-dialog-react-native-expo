import React from 'react';

export const EngDialogContext = React.createContext();

const EngDialogContextProvider = (props) => {
  const [kor, setKor] = React.useState(true);
  const [date, setDate] = React.useState(null);

  return <EngDialogContext.Provider value={{ kor, date }}>{props.children}</EngDialogContext.Provider>;
};

export default EngDialogContextProvider;
