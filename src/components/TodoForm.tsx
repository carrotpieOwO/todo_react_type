import { Space, Card, Button, Row, Divider, Input,  DatePicker, TimePicker, Form } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';
import type { InputRef } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';
import uuid from 'react-uuid'
import TagList from './TagList';
import { Tag } from './TagList';
import { addTodo } from '../store';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { RootState } from '../store'

export interface Todo {
    id : string,
    todo :string,
    date :string,
    time? :string,
    done :boolean,
    tag? :Tag,
}

function TodoForm() {
    const inputRef = useRef<InputRef>(null);
    const dispatch :Dispatch = useDispatch()
    let tagList = useSelector((state :RootState) => state.tag);

    useEffect(() => {
        inputRef.current?.focus({
            cursor: 'start',
        });
    })

    const [ input, setInput ] = useState(false);

    const onSubmit = (values: any) => {        
        const newTodo :Todo = {            
            ...values, 
            id :uuid(), 
            done: false, 
            date: dayjs(values.date).format('YYYY-MM-DD'), 
            time: values.time && dayjs(values.time).format('HH:mm'),
            tag: tagList.find(tag => tag.tag === values.tag)
        }
        
        dispatch(addTodo(newTodo));
        setInput(false)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current < dayjs().startOf('day');
    };
    
    const onCancel = () => {
        setInput(!input)
    }
    const blank_pattern = /\S/g;

    if (input) {
        return (
            <Card bordered={false} >
                <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item name="todo" rules={[{required: true, pattern: blank_pattern, message: '오늘의 할일을 입력해 주세요.'}]}>
                        <Input ref={inputRef} placeholder='오늘의 할일은?' />
                    </Form.Item>                    
                    <Divider></Divider>
                    <Row justify={'space-between'}>
                        <Space wrap>
                            <Form.Item name="date" initialValue={dayjs()}>
                                <DatePicker disabledDate={disabledDate} />
                            </Form.Item>                            
                            <Form.Item name="time">
                                <TimePicker format={'HH:mm'} />
                            </Form.Item>
                            <TagList />
                        </Space>
                        <Space wrap>
                            <Button onClick={onCancel} htmlType="button">취소</Button>
                            <Button type="primary" htmlType="submit">저장</Button>
                        </Space>
                    </Row>
                </Form>                        
            </Card> 
        );
    } else {
        return (
            <Card size='small' style={{margin: '4px 0', textAlign: 'left'}} onClick={()=> setInput(!input)}>
                <PlusSquareTwoTone style={{fontSize: '18px'}} twoToneColor="#eb2f96"/> 작업 추가하기
            </Card>
        )
    }
}

export default TodoForm;