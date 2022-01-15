import { useContext, useRef, useState } from 'react';
import { requester } from '../../../utils/requester';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { validateItemName } from '../../../utils/validator';
import CustomButton from '../CustomButton';
import './SingleTodoItem.scss';

const SingleTodoItem = ({ textContent, itemId }) => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState(textContent);
    const [isEditMode, setEditMode] = useState(false);
    const ref = useRef(null);

    const deleteItemById = async () => {
        try {
            const { deleted: deletedId } = await requester(
                'DELETE',
                `items/${itemId}`
            );

            changeAppState({
                items: appState.items.filter((i) => i.id !== deletedId),
            });
        } catch (e) {
            changeNotificationState(e.message, 'error');
        }
    };

    const patchItemById = async () => {
        try {
            validateItemName(inputValue);

            const inputValueTrimmed = inputValue.trim();

            const { edited } = await requester('PATCH', `items/${itemId}`, {
                name: inputValueTrimmed,
            });

            const itemsEdited = appState.items.map((i) => {
                if (i.id === Number(edited.id)) {
                    i.name = inputValueTrimmed;
                }
                return i;
            });

            changeAppState({
                items: itemsEdited,
            });

            setInputValue(inputValueTrimmed);

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
            ref.current.select();
        }
    };

    return (
        <div className='single-item-wrapper'>
            <input
                ref={ref}
                className={`single-item single-todo-item ${
                    isEditMode ? 'single-item-editable' : ''
                }`}
                type='text'
                value={inputValue}
                onChange={handleChangeValue}
                readOnly={!isEditMode}
                onDoubleClick={handleDoubleClick}
            />
            {isEditMode ? (
                <CustomButton
                    className='single-item-button single-todo-item-approve'
                    onClick={patchItemById}
                />
            ) : (
                <CustomButton
                    className='single-item-button single-todo-item-remove button-lines'
                    onClick={deleteItemById}
                />
            )}
        </div>
    );
};

export default SingleTodoItem;
