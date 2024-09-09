import './TodoEditor.css';
import { useState, useRef, useContext } from 'react';
import { TodoContext } from '../TodoContext';

export default function TodoEditor() {
    const {onCreate} = useContext(TodoContext);  // TodoContext 컴포넌트를 불러오고 useContext로 데이터를 꺼내온다.

    const [content, setContent] = useState("");
    const inputRef = useRef();


    const onChangeContent = (e) =>{
        setContent(e.target.value)  // 입력한 값에 따라 content 값 변경
    }

    const onClick = () => {
        if(content === ""){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13)
            onClick();
    }

    return(
        <div className='TodoEditor'>
            <input 
                ref={inputRef} 
                value={content} 
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder='새로운 Todo'>
            </input> 
            <button onClick={onClick}>추가</button>
        </div>
    )
}