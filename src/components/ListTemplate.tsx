import { useSelector } from "react-redux";
import { RootState } from '../store'
import TodoList from './TodoList';
import TimeLine from './TimeLine';
import { Todo } from './TodoForm';


function filterTodo(todoList:Todo[], filter:string) {
    let filteredTodo = [];
    if(filter === 'all') {
        filteredTodo = todoList
    } else if (filter === 'Incomplete') {
        filteredTodo = todoList.filter(todo => !todo.done);
    } else {
        filteredTodo = todoList.filter(todo => todo.tag?.tag === filter)
    }
    return filteredTodo;
}

function searchTodo(filteredTodoList:Todo[], search:string) {
    return filteredTodoList.filter(todo => todo.todo.toUpperCase().includes(search));
}

function ListTamplate() {
    let layout = useSelector((state :RootState) => state.layout);
    let todoList = useSelector((state :RootState) => state.todo);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);    
    let filter = useSelector((state :RootState) => state.filter);
    let search = useSelector((state :RootState) => state.search);
    let todayList = todoList.filter(todo => todo.date === selectedDay);
    let filteredTodo = filterTodo(todayList, filter);
    let searchedTodo = searchTodo(filteredTodo, search);

    return layout === 'board' ? <TodoList todoList={searchedTodo}/> : <TimeLine todoList={searchedTodo}/>
}

export default ListTamplate;