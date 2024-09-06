import './App.css'
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useState, useRef } from 'react';

const mockData = [
  {
    id : 0,
    isDone : true,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id : 1,
    isDone : false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id : 2,
    isDone : true,
    content: "음악 공부하기",
    createdDate: new Date().getTime(),
  },
]

function App() {

  const [todos, setTodos] = useState(mockData);  // 데이터 보관
  const ifRef = useRef(3);

  const onCreate = (content) => {  // content: input 폼에 입력한 값
    const newTodo = {
      id : ifRef.current++,
      isDone: false,
      content,  // 변수의 이름으로 프로퍼티 키 설정하고 값이 할당됨
      createdDate : new Date().getTime()
    };
    setTodos(
      [...todos, newTodo]
    );
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo)=> todo.id === targetId? {...todo, isDone : !todo.isDone} : todo)
      )
  }

  const onDelete = (targetId) => {
    setTodos(
      todos.filter((todo)=> todo.id !== targetId)
    );
  }

  return (
    <div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate}/>
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;
