import { useContext, useState } from 'react';
import AppContext from '../../../context/AppContext';
import NotificationContext from '../../../context/NotificationContext';
import { requester } from '../../../utils/requester';
import { validateItemName } from '../../../utils/validator';
import CustomButton from '../CustomButton/CustomButton';
import './NewItem.scss';

const NewItem = () => {
    const { appState, changeAppState } = useContext(AppContext);
    const { changeNotificationState } = useContext(NotificationContext);
    const [inputValue, setInputValue] = useState('');

    const postNewItem = async () => {
        try {
            validateItemName(inputValue);

            const { created } = await requester('POST', 'items', {
                name: inputValue.trim(),
            });

            changeAppState({
                items: [
                    ...appState.items,
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
        <div className='new-item-wrapper single-item-wrapper'>
            <input
                className='single-item single-item-editable single-item-new'
                type='text'
                value={inputValue}
                onChange={handleNewValue}
                placeholder='Add new to-do item'
            />
            <CustomButton
                className='single-item-button single-item-new-add button-lines'
                onClick={postNewItem}
            />
        </div>
    );
};

export default NewItem;
