import { Space, Card, Button, Row, Checkbox, Tag, Form, Input, DatePicker, TimePicker, Col, Popconfirm } from 'antd';
import { ClockCircleOutlined, DeleteTwoTone, EditTwoTone, CheckOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { useDispatch } from 'react-redux'
import { setEditForm, setAddForm, editTodo, deleteTodo, setDone } from '../store'
import { Dispatch } from 'redux';
import React, { useRef, useEffect } from 'react';
import TagList from './TagList';
import dayjs from 'dayjs';
import { Todo, disabledDate, blank_pattern } from './TodoForm';

let TodoItem = (props : {todo: Todo, isEdit:boolean}) => {
    const inputRef = useRef<InputRef>(null);
    const dispatch :Dispatch = useDispatch();
    let todo = props.todo;

    const onSubmit = (values: any) => {        
        const tagArr = values.tag ? values.tag.split(',') : undefined;
        const newTodo :Todo = {
            ...values,
            id: todo.id,
            date: dayjs(values.date).format('YYYY-MM-DD'), 
            time: values.time && dayjs(values.time).format('HH:mm'),
            tag: tagArr ? {tag: tagArr[0], color: tagArr[1]} : undefined
        }

        dispatch(editTodo(newTodo));
        dispatch(setEditForm(''));
    }

    const onCheck = (id: string, isChecked: boolean) => {
        dispatch(setDone([id, isChecked]));
    }

    const onDelete = (id :string) => {
        dispatch(deleteTodo(id));
    }

    const onOpen = (id :string) => {
        dispatch(setAddForm(false));
        dispatch(setEditForm(id));
    }

    useEffect(() => {
        inputRef.current?.focus({
            cursor: 'end',
        });
    });

    return (
        <>
        {
             props.isEdit ?
             <Card key={todo.id} size='small' style={{margin: '4px 0'}}>
                <Form onFinish={onSubmit} initialValues={{tag: todo.tag?.tag}}>
                    <Row justify={'space-between'}> 
                        <Col span={4}>
                            <TagList></TagList>
                        </Col>
                        <Col span={13}>
                            <Form.Item name="todo" rules={[{required: true, pattern: blank_pattern, message: '오늘의 할일을 입력해 주세요.'}]} initialValue={todo.todo}>
                                <Input ref={inputRef} placeholder='오늘의 할일은?'/>
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item name="date" initialValue={dayjs(todo.date)}>
                                <DatePicker disabledDate={disabledDate} style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item name="time" initialValue={todo.time && dayjs(todo.date + todo.time)}>
                                <TimePicker format={'HH:mm'}/>
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <Button type='ghost' size='small' style={{float:'right', color: '#52c41a'}}  htmlType="submit"><CheckOutlined /></Button>                                    
                        </Col>
                    </Row>                                 
                </Form>
            </Card> 
             :
            <Card key={todo.id} size='small' style={{margin: '4px 0'}}>
                <Row justify='space-between'>
                    <Checkbox checked={todo.done} onChange={(e) => { onCheck(todo.id, e.target.checked) }}>
                        {todo.tag && <Tag color={todo.tag.color}>{todo.tag.tag}</Tag>}
                        <span style={todo.done ? {textDecoration: 'line-through'} : {}}>{todo.todo}</span>
                    </Checkbox>
                    <Space style={{marginLeft: 'auto', columnGap: 0}}>
                        <div style={{width: '174px', textAlign: 'right'}}>
                            <ClockCircleOutlined></ClockCircleOutlined> {todo.date} {todo.time}
                        </div>                    
                        <Button type='ghost' size='small' htmlType='button' onClick={() => onOpen(todo.id)}><EditTwoTone /></Button>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"                                                                    
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => onDelete(todo.id)}
                        >
                            <Button type='ghost' size='small' htmlType='button'><DeleteTwoTone twoToneColor="#eb2f96"/></Button>
                        </Popconfirm>
                        
                    </Space>                 
                </Row>
            </Card> 
        }
        </>
        
    )
    
}

export default React.memo(TodoItem);