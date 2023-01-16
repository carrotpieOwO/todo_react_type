import { Collapse, Card, Row, Checkbox, Badge, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, setDone } from '../store';
import { Dispatch } from 'redux';

import dayjs from 'dayjs';
import isSameorBefore from 'dayjs/plugin/isSameOrBefore';

const { Text } = Typography;
const { Panel } = Collapse;

dayjs.extend(isSameorBefore);

function OverdueList() {    
    let todoList = useSelector((state :RootState) => state.todo);
    let today = dayjs().format('YYYY-MM-DD');
    
    let overdueList = todoList.filter(todo => dayjs(todo.date).isBefore(dayjs(today)) && !todo.done);
    const dispatch :Dispatch = useDispatch();

    const onCheck = (id: string, isChecked: boolean) => {
        dispatch(setDone([id, isChecked]))
    }

    return (
        <>
        {
            overdueList.length > 0 && 
            <Collapse defaultActiveKey={['1']} style={{marginTop: '20px'}} ghost>
                <Panel header={`기한이 지난(${overdueList.length}) 🗓`} key="1" style={{textAlign: 'left'}}>
                {
                    overdueList.map(todo => 
                        <Badge.Ribbon key={todo.id} text={`D+${dayjs().diff(dayjs(todo.date), 'day', true).toFixed(0)}`} color="pink">
                            <Card size='small' style={{margin: '4px 0'}}>
                            <Row justify='space-between'>
                                <Checkbox onChange={ (e) => onCheck(todo.id, e.target.checked)}>
                                    <Text>{todo.todo}</Text>
                                </Checkbox>
                                <Text type="danger" style={{marginRight: '30px'}}>
                                <span style={{marginRight: '10px'}}>
                                    <ClockCircleOutlined></ClockCircleOutlined> {todo.date}
                                </span>
                                </Text>
                            </Row>                            
                            </Card>
                        </Badge.Ribbon>
                    )
                }
                </Panel>
            </Collapse>
        }
        </>
    )
}

export default OverdueList;