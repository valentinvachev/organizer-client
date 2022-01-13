import React from 'react';

const NotificationContext = React.createContext({
    notificationState: {},
    setNotificationState: () => {},
});

export const notificationInitialState = {
    message: '',
    type: '',
};

export const NotificationContextProvider = NotificationContext.Provider;
export default NotificationContext;
