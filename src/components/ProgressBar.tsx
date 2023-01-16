import { Progress, Divider, Typography, Row } from 'antd';
import { Todo } from './TodoForm';

const { Text } = Typography;

function ProgressBar(props :{todayList :Todo[]}) {
    const doneTodo = props.todayList.filter(todo => todo.done === true);
    const percentage = parseFloat((doneTodo.length * 100 / props.todayList.length).toFixed(2));

    const message = isNaN(percentage) ? '오늘의 할일을 추가해봐요!'
    : percentage === 0  ? '하루를 시작합시다!😀' 
    : percentage > 0 && percentage <= 25 ? '오늘 하루도 화이팅💕'
    : percentage > 25 && percentage <= 75 ? '조금 더 분발하세요!💪🏻'
    : percentage > 50 && percentage <= 90 ? '목표가 눈앞에!👀'
    : percentage > 90 && percentage <= 99 ? '여기서 쉰다고?🤔'
    : percentage === 100 ? '수고했어 오늘도🌙' : '';

    return (
        <>
            <Divider orientation="left">오늘의 할일({props.todayList.length}) ✍🏻</Divider>
            <Progress percent={percentage} status="active" strokeColor={{ from: '#fb9ec4', to: '#8865ff' }} />
            <Row justify={'center'} style={{'margin': '15px 0'}}>
                <Text>{message}</Text>
            </Row>            
        </>
    )
}

export default ProgressBar;