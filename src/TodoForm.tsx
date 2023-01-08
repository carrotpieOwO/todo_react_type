import { Space, Card, Button, Row, Divider, Input,  DatePicker, TimePicker, Select } from 'antd';
import { PlusSquareTwoTone, PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { ColorChangeHandler, CirclePicker } from "react-color";

const { Option } = Select;
const defaultTagColor = '#d8d8d8';

interface Tag {
    tag :string;
    color :string;
}
function TodoForm() {
    const [ input, setInput ] = useState(false);
    const [ todo, setTodo ] = useState('');
    const [ todoError, setTodoError ] = useState(false);
    const [ tag, setTag ] = useState('');
    const [ items, setItems ] = useState<Tag[]>([]);
    const [ color, setColor ] = useState('#d8d8d8');
    const [ showColor, setShowColor ] = useState(false);

    const inputRef = useRef<InputRef>(null);

    const onChange = (event :React.FormEvent<HTMLInputElement>) => {
        const { currentTarget: {value} } = event;
        if(value.length > 0) {
            setTodoError(false);
        }
        setTodo(value);
    }
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {        
        event.preventDefault();
        todo.length <= 0 ? setTodoError(true) : setTodoError(false);
    }
    const onTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTag(event.target.value);
    }
    const setColorPicker = () => {
        setShowColor(!showColor);
    }
    const onColorChange :ColorChangeHandler = (c) => {
        setColor(c.hex);
        setShowColor(false);
    }
    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setItems([...items, {tag, color}])         
        setTag('');
        setColor(defaultTagColor);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }
   
    if (input) {
        return (
            <Card bordered={false} >
                <form onSubmit={onSubmit}>
                    {
                        todoError ? 
                        <>
                            <Input placeholder='오늘의 할일은?' status='error' onChange={onChange} value={todo}></Input>
                            <div>오늘의 할일을 입력해 주세요.</div>
                        </>
                        :
                        <Input placeholder='오늘의 할일은?' onChange={onChange} value={todo}></Input>

                    }
                    <Divider></Divider>
                    <Row justify={'space-between'}>
                        <Space wrap style={{color: 'pink'}}>
                            <DatePicker defaultValue={dayjs()} />
                            <TimePicker format={'HH:mm'} />
                            
                            <Select
                                style={{ width: 300 }}
                                placeholder="태그 추가"
                                dropdownRender={(menu) => (                                    
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '8px 0' }} />
                                        <Space style={{ padding: '0 8px 4px' }}>
                                            <Input.Group compact>                                                                                                                                                                            
                                                <Input placeholder="Please enter item" ref={inputRef} value={tag} onChange={onTagChange} style={{ width: 'calc(100% - 50px)' }}></Input>                                                
                                                <Button onClick={setColorPicker}><BgColorsOutlined style={{color: color}}/></Button>
                                            </Input.Group>
                                            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>Add</Button>
                                        </Space>
                                        {
                                            showColor && (
                                                <Divider>
                                                    <CirclePicker onChangeComplete={onColorChange}/>
                                                </Divider>
                                            )
                                        }
                                                                          
                                    </>
                                )}
                                onDropdownVisibleChange={open => !open && setShowColor(false)}
                            >
                                {
                                    items.map(item => (
                                        <Option key={item.tag} value={item.tag} label={item.tag}>
                                            <Row align={'middle'}>                                        
                                                <div style={{width:'16px', height: '16px', backgroundColor: item.color, borderRadius: '3px', marginRight: '3px'}}></div>
                                                {item.tag}
                                            </Row>                                    
                                        </Option>
                                    ))
                                }
                            </Select>
                        </Space>
                        <Space wrap>
                            <Button onClick={(event)=> setInput(!input)} htmlType="button">취소</Button>
                            <Button type="primary" htmlType="submit">저장</Button>
                        </Space>
                    </Row>
                </form>                        
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