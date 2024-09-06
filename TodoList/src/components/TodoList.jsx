import './TodoList.css';
import TodoItem from './TodoItem';
import { useState, useMemo } from 'react';

export default function TodoList({todos, onUpdate, onDelete}){

    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const filterTodos = () => {
        if (search === "") {
            return todos;
        }
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => (todo.isDone)).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todos]);  // todos 값이 변경되었을 때, 콜백 함수가 다시 실행

    return(
        <div className='TodoList'>
            <h4>Todos</h4>
            <div>
                <div>전체 투두 : {totalCount}</div>
                <div>완료 투두 : {doneCount}</div>
                <div>미완료 투두 : {notDoneCount}</div>
            </div>
            <input 
                value={search}
                onChange={onChangeSearch}
                placeholder='검색어를 입력하세요'/>
            <div className='todos_wrapper'>
            {  
                filterTodos().map((todo)=>(  // 함수.map
                    <TodoItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />
                    )
                )
            }
            </div>
        </div>
    );
}
