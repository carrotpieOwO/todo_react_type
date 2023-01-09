import { Progress } from 'antd';
import { useSelector } from 'react-redux'
import { RootState } from '../store'


function ProgressBar() {
    const todoList = useSelector((state :RootState) => state.todo);
    const doneTodo = todoList.filter(todo => todo.done === true);
    const percentage = parseFloat((doneTodo.length * 100 / todoList.length).toFixed(2));
    
    const message = percentage === 0 || isNaN(percentage) ? '하루를 시작합시다!😀' 
    : percentage > 0 && percentage <= 25 ? '오늘 하루도 화이팅💕'
    : percentage > 25 && percentage <= 75 ? '조금 더 분발하세요!💪🏻'
    : percentage > 50 && percentage <= 90 ? '목표가 눈앞에!👀'
    : percentage > 90 && percentage <= 99 ? '여기서 쉰다고?🤔'
    : percentage === 100 ? '수고했어 오늘도🌙' : '';

    return (
        <>
            <Progress percent={percentage} status="active" strokeColor={{ from: '#fb9ec4', to: '#8865ff' }} />
            <div style={{textAlign: 'center', padding: '15px 0'}}>{message}</div>
        </>
    )
}

export default ProgressBar;