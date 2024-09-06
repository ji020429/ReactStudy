import './TodoEditor.css';
import { useState, useRef } from 'react';

export default function TodoEditor({onCreate}){

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