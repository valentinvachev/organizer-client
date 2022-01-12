import React from 'react';

const AppContext = React.createContext({
    appState: {},
    changeAppState: () => {},
});

export const initialState = {
    items: []
};

export const AppContextProvider = AppContext.Provider;