import { AppContextProvider, initialState } from './context/AppContent';
import HomePage from './components/HomePage';
import { useCallback, useState } from 'react';
import './App.scss';

const App = () => {
    const [stateValue, setStateValue] = useState(initialState);

    const changeAppState = useCallback((newState) => {
        setStateValue((oldState) => {
            return {
                ...oldState,
                ...newState,
            };
        });
    }, []);

    return (
        <AppContextProvider
            value={{
                appState: stateValue,
                changeAppState,
            }}
        >
            <div className='application'>
                <HomePage />
            </div>
        </AppContextProvider>
    );
};

export default App;
