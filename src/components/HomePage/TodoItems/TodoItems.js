import { useContext, useEffect, useState } from 'react';
import { requester } from '../../../utils/requester';
import AppContext from '../../../context/AppContext';
import SingleTodoItem from '../SingleTodoItem';
import NotificationContext from '../../../context/NotificationContext';
import './TodoItems.scss';

const TodoItems = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const getTodoItems = async () => {
            try {
                const itemsData = await requester('GET', 'items');

                changeAppState({
                    items: itemsData.map((i) => ({
                        ...i,
                        id: Number(i.id),
                    })),
                });

                setLoading(false);
            } catch (e) {
                setLoading(false);
                changeNotificationState(e.message, 'error');
            }
        };

        getTodoItems();
    }, [changeAppState, changeNotificationState]);

    return (
        <div className='todo-items-wrapper'>
            {isLoading ? (
                <p className='todo-items-loading-state'>Loading...</p>
            ) : appState.items.length ? (
                appState.items.map((i) => (
                    <SingleTodoItem
                        key={i.id}
                        textContent={i.name}
                        itemId={i.id}
                    />
                ))
            ) : (
                <p className='todo-items-empty-state'>
                    No scheduled to-do items
                </p>
            )}
        </div>
    );
};

export default TodoItems;
