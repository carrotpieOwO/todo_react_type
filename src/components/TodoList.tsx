import { Space, Card, Button, Row, Checkbox, Tag } from 'antd';
import { ClockCircleOutlined, DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux'
import { RootState } from '../store'


function TodoList() {

    let todoList = useSelector((state :RootState) => state.todo);

    return (        
        <>
            {
                todoList.map(todo =>                 
                    <Card key={todo.id} size='small' style={{margin: '4px 0'}}>
                        <Row justify='space-between'>
                            <Checkbox>
                                {todo.tag && <Tag color={todo.tag.color}>{todo.tag.tag}</Tag>}
                                {todo.todo}
                            </Checkbox>
                            <Space style={{marginLeft: 'auto', columnGap: 0}}>
                                <div style={{width: '174px', textAlign: 'right'}}>
                                    <ClockCircleOutlined></ClockCircleOutlined> {todo.date} {todo.time}
                                </div>                    
                                <Button type='ghost' size='small'><EditTwoTone /></Button>
                                <Button type='ghost' size='small'><DeleteTwoTone twoToneColor="#eb2f96"/></Button>
                            </Space>                 
                        </Row>
                    </Card>                    
                )
            }            
        </>        
    )
}

export default TodoList;