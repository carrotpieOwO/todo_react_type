import { Space, Button, Row, Divider, Input,  Select, Form } from 'antd';
import { PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { ColorChangeHandler, CirclePicker } from "react-color";
import type { InputRef } from 'antd';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addTag } from '../store';
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const { Option } = Select;
const defaultTagColor = '#d8d8d8';

export interface Tag {
    tag :string;
    color :string;
}


function TagList() {
    const inputRef = useRef<InputRef>(null);
    const dispatch :Dispatch = useDispatch()
    let tagList = useSelector((state :RootState) => state.tag);

    const [ tag, setTag ] = useState('');
    const [ color, setColor ] = useState(defaultTagColor);
    const [ showColor, setShowColor ] = useState(false);

  
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
        dispatch(addTag({tag, color}))
        setTag('');
        setColor(defaultTagColor);
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }
  
    return (
        <Form.Item name="tag">
            <Select
                style={{ width: 300 }} placeholder="태그 추가" dropdownRender={(menu) => (                                    
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
                    tagList.map(item => (
                        <Option key={item.tag} value={item.tag} label={item.tag}>
                            <Row align={'middle'}>                                        
                                <div style={{width:'16px', height: '16px', backgroundColor: item.color, borderRadius: '3px', marginRight: '3px'}}></div>
                                {item.tag}
                            </Row>                                    
                        </Option>
                    ))
                }
            </Select>
        </Form.Item>   
    )
}

export default TagList;