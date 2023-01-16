import { Timeline, Checkbox, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { setDone } from '../store'
import { Dispatch } from 'redux';
import { Todo } from './TodoForm';

function getTime(date: Date) {
    return date.toString() === 'Invalid Date' ? 0 : date.getTime();
}

function TimeLine(props : {todoList: Todo[]}) {    
    const dispatch :Dispatch = useDispatch();
    
    let sortedTimeList = props.todoList.sort((a:Todo, b:Todo) => {        
        return getTime(new Date(`${a.date} ${a.time}`)) - getTime(new Date(`${b.date} ${b.time}`));
    })

    const onCheck = (id: string, isChecked: boolean) => {
        dispatch(setDone([id, isChecked]));
    }

    return (
        <> {
            props.todoList.length > 0 &&
                <Card style={{paddingTop: 40, marginTop: 20}}>
                    <Timeline mode='left' style={{alignItems: 'middle'}}>
                        {
                            sortedTimeList.map(todo => 
                                <Timeline.Item key={todo.id} label={todo.time} 
                                    color={todo.tag ? todo.tag.color : '#d8d8d8'}
                                    style={{color: '#d8d8d8'}}>
                                    <Checkbox checked={todo.done} 
                                        onChange={(e) => onCheck(todo.id, e.target.checked)}>
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