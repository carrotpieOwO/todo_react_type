import { Space, Card, Button, Row, Divider, Input,  DatePicker, TimePicker, Form } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons';
import type { InputRef } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import type { RangePickerProps } from 'antd/es/date-picker';
import uuid from 'react-uuid'
import TagList from './TagList';
import { Tag } from './TagList';
import { addTodo, setAddForm, setEditForm } from '../store';
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
export const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // 오늘날짜 이전 날짜는 선택할 수 없다.
    return current < dayjs().startOf('day');
};
export const blank_pattern = /\S/g;

function TodoForm(props: {day :string}) {
    const inputRef = useRef<InputRef>(null);
    const dispatch :Dispatch = useDispatch()
    let isOpen = useSelector((state :RootState) => state.form.addForm);

    useEffect(() => {
        inputRef.current?.focus({
            cursor: 'start',
        });
    })

    const onCancel = () => {
        dispatch(setAddForm(false));
    }
    
    const onOpen = () => {
        dispatch(setAddForm(true));
        dispatch(setEditForm(''));
    }

    const onSubmit = (values: any) => {
        const tagArr = values.tag ? values.tag.split(',') : undefined;

        const newTodo :Todo = {            
            ...values, 
            id :uuid(), 
            done: false, 
            date: dayjs(values.date).format('YYYY-MM-DD'), 
            time: values.time && dayjs(values.time).format('HH:mm'),
            tag: tagArr ? {tag: tagArr[0], color: tagArr[1]} : undefined
        }
        
        dispatch(addTodo(newTodo));
        dispatch(setAddForm(false));
    }

    // 테스트용
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    if (isOpen) {
        return (
            <Card bordered={false} >
                <Form onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                    <Form.Item name="todo" rules={[{required: true, pattern: blank_pattern, message: '오늘의 할일을 입력해 주세요.'}]}>
                        <Input ref={inputRef} placeholder='오늘의 할일은?' />
                    </Form.Item>                    
                    <Divider></Divider>
                    <Row justify={'space-between'}>
                        <Space wrap>
                            <Form.Item name="date" initialValue={dayjs(props.day)}>
                                <DatePicker disabledDate={disabledDate}/>
                            </Form.Item>                            
                            <Form.Item name="time">
                                <TimePicker format={'HH:mm'} />
                            </Form.Item>
                            <TagList width={200}/>
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
            <Card size='small' style={{margin: '4px 0', textAlign: 'left'}} onClick={onOpen}>
                <PlusSquareTwoTone style={{fontSize: '18px'}} twoToneColor="#eb2f96"/> 작업 추가하기
            </Card>
        )
    }
}

export default TodoForm;