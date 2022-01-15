import { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { requester } from '../../../utils/requester';
import { validateItemName } from '../../../utils/validator';
import './NewTask.scss';

const NewTask = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState('');

    const postNewTask = async () => {
        try {
            validateItemName(inputValue);

            const { created } = await requester('POST', 'tasks', {
                name: inputValue.trim(),
            });

            changeAppState({
                tasks: [
                    ...appState.tasks,
                    {
                        ...created,
                        id: Number(created.id),
                    },
                ],
            });

            setInputValue('');
        } catch (e) {
            changeNotificationState(e.message, 'error');
        }
    };

    const handleNewValue = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
    };

    return (
        <div className='new-task-wrapper single-task-wrapper'>
            <input
                className='single-task single-task-editable single-task-new'
                type='text'
                value={inputValue}
                onChange={handleNewValue}
            />
            <button
                className='single-task-button single-task-new-add'
                onClick={postNewTask}
            />
        </div>
    );
};

export default NewTask;
