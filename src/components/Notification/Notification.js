import { useCallback, useContext, useEffect, useState } from 'react';
import NotificationContext from '../../context/NotificationContext';
import './Notification.scss';

const Notification = () => {
    const { notificationState } = useContext(NotificationContext);
    const [isVisible, setVisible] = useState(false);
    const [type, setType] = useState('');

    const hideNotification = useCallback(() => {
        setVisible(false);
    }, []);

    useEffect(() => {
        if (notificationState.type) {
            setVisible(true);
            setType(notificationState.type);
        }

        const timeout = setTimeout(() => {
            hideNotification();
        }, 2000);

        return () => clearTimeout(timeout);
    }, [notificationState, hideNotification]);

    return (
        <div
            className={`notification-wrapper ${
                isVisible ? 'notification-visible' : 'notification-hidden'
            } ${
                type === 'error' ? 'notification-error' : 'notification-message'
            }`}
            onClick={() => setVisible(false)}
        >
            <p className='notification-text'>{notificationState.message}</p>
        </div>
    );
};

export default Notification;
