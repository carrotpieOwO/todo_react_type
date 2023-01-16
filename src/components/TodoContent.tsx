import TodoForm from './TodoForm';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { Todo } from './TodoForm';
import TodoItem from './TodoItem';
import TimeLine from './TimeLine';


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

function TodoContent() {
    let todoList = useSelector((state :RootState) => state.todo);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);    
    let filter = useSelector((state :RootState) => state.filter);
    let search = useSelector((state :RootState) => state.search);
    let todayList = todoList.filter(todo => todo.date === selectedDay);
    let filteredTodo = filterTodo(todayList, filter);
    let searchedTodo = searchTodo(filteredTodo, search);
    let editTarget = useSelector((state :RootState) => state.form.editTarget);
    let layout = useSelector((state :RootState) => state.layout);


    return (
        <>
            <ProgressBar todayList={todayList}/>
            <TodoForm day={selectedDay}/>
            {
                layout === 'board' ? 
                searchedTodo.map(todo =>
                    <TodoItem key={todo.id} todo={todo} isEdit={todo.id === editTarget}/>                   
                )
                :
                <TimeLine todoList={searchedTodo}/>
            }
        </>
      );
}

export default TodoContent;