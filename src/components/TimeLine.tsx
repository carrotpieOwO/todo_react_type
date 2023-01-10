import { Timeline, Checkbox, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setDone } from '../store'
import { Dispatch } from 'redux';
import { Todo } from './TodoForm';
import { filterTodo } from './TodoList';

function getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
}

function TimeLine() {
    let todoList = useSelector((state :RootState) => state.todo);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);
    let filter = useSelector((state :RootState) => state.filter);

    const dispatch :Dispatch = useDispatch();

    let todayList = todoList.filter(todo => todo.date === selectedDay);
    let filteredTodo = filterTodo(todayList, filter);

    let timeList:TimeTodo[] = [];
    interface TimeTodo extends Todo {
        time :string
    }
    filteredTodo.forEach(todo => {
        todo.time && timeList.push(todo as TimeTodo)
    })
   
    let sortedTimeList = timeList.sort((a:TimeTodo, b:TimeTodo) => {        
        return getTime(new Date(`${a.date} ${a.time}`)) - getTime(new Date(`${b.date} ${b.time}`));
    })

    let noTimeList = filteredTodo.filter(todo => !todo.time)    

    return (
        <> {
            filteredTodo.length > 0 &&
                <Card style={{paddingTop: 40, marginTop: 20}}>
                    <Timeline mode='left' style={{alignItems: 'middle'}}>
                        {
                            noTimeList.map(todo => 
                                <Timeline.Item label='시간없음' 
                                    color={todo.tag ? todo.tag.color : '#d8d8d8'}
                                    style={{color: '#d8d8d8'}}>
                                    <Checkbox checked={todo.done} 
                                        onChange={(e) => {dispatch(setDone([todo.id, e.target.checked]))}}>
                                        <span style={todo.done ? {textDecoration: 'line-through'} : {}}>{todo.todo}</span>
                                    </Checkbox>
                                </Timeline.Item>
                            )
                        }
                        {
                            sortedTimeList.map(todo => 
                                <Timeline.Item label={todo.time} 
                                    color={todo.tag ? todo.tag.color : '#d8d8d8'} 
                                    style={{color: todo.tag ? todo.tag.color : '#000'}}>
                                    <Checkbox checked={todo.done} 
                                        onChange={(e) => {dispatch(setDone([todo.id, e.target.checked]))}}>
                                        <span style={todo.done ? {textDecoration: 'line-through'} : {}}>{todo.todo}</span>
                                    </Checkbox>
                                </Timeline.Item>
                            )
                        }
                    </Timeline>
                </Card>                
            }
        </>
    )
}

export default TimeLine;