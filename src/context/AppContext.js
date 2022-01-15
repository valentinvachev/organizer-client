import React from 'react';

const AppContext = React.createContext({
    appState: {},
    setAppState: () => {},
});

export const appInitialState = {
    items: [],
    weather: {
        city: '',
        temperature: 0,
    },
};

export const AppContextProvider = AppContext.Provider;
export default AppContext;
