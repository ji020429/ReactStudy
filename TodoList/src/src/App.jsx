import './App.css'
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { useRef, useReducer, useCallback } from 'react';
import { TodoContext } from './TodoContext';

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
];

function reducer(state, action) {
  switch(action.type){
    case "CREATE":{
      return [...state, action.data];  // reducer가 반환하는 값으로 state가 변경
    }
    case "UPDATE":{
      return state.map((item)=>item.id === action.data? {...item, isDone: !item.isDone}:item);
    }
    case "DELETE":{
      return state.filter((item)=>(item.id !== action.data));
    }
  }
}

function App() {

  const [todos, dispatch] = useReducer(reducer, mockData);
  const ifRef = useRef(3);

  const onCreate = (content) => {  // content: input 폼에 입력한 값
    dispatch({
      type: "CREATE",
      data: {
        id : ifRef.current++,
        isDone: false,
        content,  // 변수의 이름으로 프로퍼티 키 설정하고 값이 할당됨
        createdDate : new Date().getTime()
      },
    });
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      data: targetId
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      data: targetId
    });
  }, []);

  return (
    <div className="App">
      <Header/>
      <TodoContext.Provider value={{  // Provider 컴포넌트로 데이터를 어디에 공급할지 설정해준다. value로 어떤 데이터를 공급할지 설정
        todos,
        onCreate,
        onDelete,
        onUpdate
      }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
