import { Space, Card, Button, Row, Checkbox, Tag, Form, Input, DatePicker, TimePicker, Col, Popconfirm } from 'antd';
import { ClockCircleOutlined, DeleteTwoTone, EditTwoTone, CheckOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setEditForm, setAddForm, editTodo, deleteTodo, setDone } from '../store'
import { Dispatch } from 'redux';
import React, { useState, useRef, useEffect } from 'react';
import TagList from './TagList';
import dayjs from 'dayjs';
import { Todo, disabledDate, blank_pattern } from './TodoForm';

export function filterTodo(todoList:Todo[], filter:string) {
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

function TodoList() {
    const inputRef = useRef<InputRef>(null);
    let todoList = useSelector((state :RootState) => state.todo);
    let tagList = useSelector((state :RootState) => state.tag);
    let isOpen = useSelector((state :RootState) => state.form.editform);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);    
    let filter = useSelector((state :RootState) => state.filter);
    let todayList = todoList.filter(todo => todo.date === selectedDay);
    const dispatch :Dispatch = useDispatch();

    const [ editTarget, setEditTarget ] = useState('');

    useEffect(() => {
        inputRef.current?.focus({
            cursor: 'end',
        });
    });

    let filteredTodo = filterTodo(todayList, filter);
    
    const onOpen = (id :string) => (event: React.MouseEvent) => {
        dispatch(setAddForm(false));
        dispatch(setEditForm(true));
        setEditTarget(id);
    }

    const onSubmit = (values: any) => {        
        const newTodo :Todo = {            
            ...values,
            id: editTarget,
            date: dayjs(values.date).format('YYYY-MM-DD'), 
            time: values.time && dayjs(values.time).format('HH:mm'),
            tag: tagList.find(tag => tag.tag === values.tag)
        }

        dispatch(editTodo(newTodo));
        setEditTarget('');
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (        
        <>
            {
                filteredTodo.map(todo =>
                    todo.id === editTarget &&  isOpen ?
                    <Card key={todo.id} size='small' style={{margin: '4px 0'}}>
                        <Form onFinish={onSubmit} onFinishFailed={onFinishFailed} initialValues={{tag: todo.tag?.tag}}>
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
                            <Checkbox checked={todo.done} onChange={(e) => {
                                dispatch(setDone([todo.id, e.target.checked]))                          
                            }}>
                                {todo.tag && <Tag color={todo.tag.color}>{todo.tag.tag}</Tag>}
                                <span style={todo.done ? {textDecoration: 'line-through'} : {}}>{todo.todo}</span>
                            </Checkbox>
                            <Space style={{marginLeft: 'auto', columnGap: 0}}>
                                <div style={{width: '174px', textAlign: 'right'}}>
                                    <ClockCircleOutlined></ClockCircleOutlined> {todo.date} {todo.time}
                                </div>                    
                                <Button type='ghost' size='small' htmlType='button' onClick={onOpen(todo.id)}><EditTwoTone /></Button>
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"                                                                    
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => {dispatch(deleteTodo(todo.id))}}
                                >
                                    <Button type='ghost' size='small' htmlType='button'><DeleteTwoTone twoToneColor="#eb2f96"/></Button>
                                </Popconfirm>
                                
                            </Space>                 
                        </Row>
                    </Card> 
                )
            }
        </>  
    )
}

export default TodoList;