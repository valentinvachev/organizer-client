import { useContext, useRef, useState } from 'react';
import { requester } from '../../../utils/requester';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { validateTaskName } from '../../../utils/validator';
import './SingleActiveTask.scss';

const SingleActiveTask = ({ textContent, taskId }) => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState(textContent);
    const [isEditMode, setEditMode] = useState(false);
    const ref = useRef(null);

    const deleteTaskById = async () => {
        try {
            const { deleted: deletedId } = await requester(
                'DELETE',
                `tasks/${taskId}`
            );

            changeAppState({
                tasks: appState.tasks.filter((t) => t.id !== deletedId),
            });
        } catch (e) {
            changeNotificationState(e.message, 'error');
        }
    };

    const patchTaskById = async () => {
        try {
            validateTaskName(inputValue);

            const { edited } = await requester('PATCH', `tasks/${taskId}`, {
                name: inputValue,
            });

            const tasksEdited = appState.tasks.map((t) => {
                if (t.id === Number(edited.id)) {
                    t.name = inputValue;
                }
                return t;
            });

            changeAppState({
                tasks: tasksEdited,
            });

            setEditMode(false);
        } catch (e) {
            changeNotificationState(e.message, 'error');
        }
    };

    const handleChangeValue = (e) => {
        const newInputValue = e.target.value;
        setInputValue(newInputValue);
    };

    const handleDoubleClick = () => {
        setEditMode(true);

        if (!isEditMode) {
            ref.current.blur();
        }
    };

    return (
        <div className='single-task-wrapper'>
            <input
                ref={ref}
                className={`single-task single-task-active ${
                    isEditMode ? 'single-task-editable' : ''
                }`}
                type='text'
                value={inputValue}
                onChange={handleChangeValue}
                readOnly={!isEditMode}
                onDoubleClick={handleDoubleClick}
            />
            {isEditMode ? (
                <button
                    className='single-task-button single-task-active-approve'
                    onClick={patchTaskById}
                />
            ) : (
                <button
                    className='single-task-button single-task-active-remove'
                    onClick={deleteTaskById}
                />
            )}
        </div>
    );
};

export default SingleActiveTask;
