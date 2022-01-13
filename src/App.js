import { AppContextProvider, appInitialState } from './context/AppContext';
import {
    NotificationContextProvider,
    notificationInitialState,
} from './context/NotificationContext';
import HomePage from './components/HomePage';
import Notification from './components/Notification';
import { useCallback, useState } from 'react';
import './App.scss';

const App = () => {
    const [appState, setAppState] = useState(appInitialState);
    const [notificationState, setNotificationState] = useState(
        notificationInitialState
    );

    const changeAppState = useCallback((newState) => {
        setAppState((oldState) => {
            return {
                ...oldState,
                ...newState,
            };
        });
    }, []);

    const changeNotificationState = useCallback((message, type) => {
        setNotificationState({ message, type });
    }, []);

    return (
        <NotificationContextProvider
            value={{ notificationState, changeNotificationState }}
        >
            <AppContextProvider
                value={{
                    appState,
                    changeAppState,
                }}
            >
                <div className='application'>
                    <Notification />
                    <HomePage />
                </div>
            </AppContextProvider>
        </NotificationContextProvider>
    );
};

export default App;
