import { useContext, useEffect, useState } from 'react';
import { requester } from '../../../utils/requester';
import AppContext from '../../../context/AppContext';
import SingleActiveTask from '../SingleActiveTask';
import NotificationContext from '../../../context/NotificationContext';
import './ActiveTasks.scss';

const ActiveTasks = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getActiveTasks = async () => {
            try {
                const tasksData = await requester('GET', 'tasks');

                changeAppState({
                    tasks: tasksData.map((t) => ({
                        ...t,
                        id: Number(t.id),
                    })),
                });
                setLoading(false);
            } catch (e) {
                setLoading(false);
                changeNotificationState(e.message, 'error');
            }
        };

        getActiveTasks();
    }, []);

    return (
        <div className='active-tasks-wrapper'>
            {isLoading ? (
                <p className='active-task-loading-state'>Loading...</p>
            ) : appState.tasks.length ? (
                appState.tasks.map((t) => (
                    <SingleActiveTask
                        key={t.id}
                        textContent={t.name}
                        taskId={t.id}
                    />
                ))
            ) : (
                <p className='active-task-empty-state'>No scheduled tasks</p>
            )}
        </div>
    );
};

export default ActiveTasks;
