import { TodoContext } from '../TodoContext';
import './TodoItem.css';
import { memo, useContext } from 'react';

function TodoItem({ id, isDone, content, createdDate }) {
    
    const { onUpdate, onDelete } = useContext(TodoContext);

    const onChangeCheckbox = () =>{
        onUpdate(id);
    }

    const onClickDeleteButton = () => {
        onDelete(id);
    }

    return(
        <div className='TodoItem'>
            <input type='checkbox' checked={isDone} onChange={onChangeCheckbox}/>
            <div className='content'>{content}</div>
            <div className='date'>{new Date (createdDate).toLocaleDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
}

export default memo(TodoItem);