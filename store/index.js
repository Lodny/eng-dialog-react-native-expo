import React from 'react';

export const DialogContext = React.createContext();

const dialogReducer = (store, { type, payload }) => {
  switch (type) {
    case 'SET_DIALOGS':
      return { ...store, dialogs: payload };

    case 'ADD_DIALOG':
      return { ...store, dialogs: [...dialogs, payload] };

    case 'SET_PAGE':
      return { ...store, page: payload };

    // case 'SET_CURR_DATE':
    //   return { ...store, currDate: payload };

    default:
      console.log(`dialogReducer : default :`, type);
      return store;
  }
};

const initData = {
  dialogs: [],
  kor: true,
  page: 'dialog',
  currDate: new Date(),
};

const DialogStore = (props) => {
  const [store, dispatch] = React.useReducer(dialogReducer, initData);

  React.useEffect(() => {
    console.log(`store/index : `);
  }, [store]);

  return <DialogContext.Provider value={{ store, dispatch }}>{props.children}</DialogContext.Provider>;
};

export default DialogStore;
