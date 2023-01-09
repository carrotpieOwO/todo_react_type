import { Button, Row, Divider, Input,  Select, Form } from 'antd';
import { PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import React, { useState, useRef } from 'react';
import { ColorChangeHandler, CirclePicker } from "react-color";
import type { InputRef } from 'antd';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addTag } from '../store';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { blank_pattern } from './TodoForm';
const { Option } = Select;
const defaultTagColor = '#d8d8d8';

export interface Tag {
    tag :string;
    color :string;
}

const colors = [
    "#0C797D",
    "#16A5A5",
    "#68CCCA",

    "#0062B1",
    "#009CE0",
    "#73D8FF",

    "#653294",
    "#7B64FF",
    "#AEA1FF",

    "#AB149E",
    "#FA28FF",
    "#FDA1FF"
]
function TagList(props :{width?:number}) {
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
        if(blank_pattern.test(tag)) {
            dispatch(addTag({tag, color}))
            setTag('');
            setColor(defaultTagColor);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }
  
    return (
        <Form.Item name="tag">
            <Select
                style={{width: props.width}} placeholder="태그 추가" dropdownRender={(menu) => (                                    
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Row align={'middle'} justify={'center'}>
                            <Input.Group compact>
                                <Input placeholder="enter tag" ref={inputRef} value={tag} onChange={onTagChange} style={{ width: 'calc(100% - 50px)' }}></Input>                                                
                                <Button onClick={setColorPicker}><BgColorsOutlined style={{color: color}}/></Button>
                            </Input.Group>
                        </Row>
                        {
                            showColor && (
                                <Divider>
                                    <CirclePicker onChangeComplete={onColorChange} width={`${props.width}`} colors={colors}/>
                                </Divider>
                            )
                        }
                        <Button block type="primary" style={{marginTop: '10px'}} icon={<PlusOutlined />} onClick={addItem}>Add</Button>

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