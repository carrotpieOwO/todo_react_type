import { Button, Row, Divider, Input,  Select, Form, Typography } from 'antd';
import { PlusOutlined, BgColorsOutlined } from '@ant-design/icons';
import React, { useState, useRef, useEffect } from 'react';
import { ColorChangeHandler, CirclePicker } from "react-color";
import type { InputRef } from 'antd';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { addTag } from '../store';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { blank_pattern } from './TodoForm';
const { Option } = Select;
const { Text } = Typography;

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
    const [ errorMsg, setErrorMsg ] = useState('');

    // 태그를 중복으로 작성하거나 ,를 포함시킬 경우 에러메시지를 띄워준다.
    useEffect(() => {
        tagList.findIndex(t => t.tag === tag) >= 0 ? setErrorMsg('동일한 태그가 존재합니다.')
        : tag.includes(',') ? setErrorMsg(',는 사용할 수 없습니다.')
        : setErrorMsg('')
    }, [tag]);

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
        
        // validation check후 저장한다.
        if(blank_pattern.test(tag) && tagList.findIndex(t => t.tag === tag) === -1 && !tag.includes(',')) {
            dispatch(addTag({tag, color}))
            setTag('');
            setErrorMsg('');
            setColor(defaultTagColor);
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    }
  
    return (
        <Form.Item name="tag">
            <Select
                style={{width: props.width}} placeholder="태그 추가" onFocus={()=>setTag('')} dropdownRender={(menu) => (                                    
                    <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Row align={'middle'} justify={'center'}>
                            <Input.Group compact>
                                <Input placeholder="enter tag" ref={inputRef} value={tag} onChange={onTagChange} style={{ width: 'calc(100% - 50px)' }}></Input>                                                
                                <Button onClick={setColorPicker}><BgColorsOutlined style={{color: color}}/></Button>
                            </Input.Group>
                            { errorMsg && <Text style={{'color': '#dc4446'}}>{errorMsg}</Text> }    
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
                        <Option key={item.tag} value={`${item.tag},${item.color}`} label={item.tag}>
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