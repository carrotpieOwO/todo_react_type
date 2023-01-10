import { Space, Button, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setDay, setAddForm } from '../store'
import { Dispatch } from 'redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect } from 'react';
dayjs.locale('ko');

function WeekButton() {
    const dispatch :Dispatch = useDispatch();
    let week = useSelector((state :RootState) => state.week);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);

    useEffect(() => {
        dispatch(setDay(week[0]));
    }, [week])

    useEffect(() => {
        dispatch(setDay(selectedDay))
    }, [])

    useEffect(() => {
        dispatch(setAddForm(false));
    }, [selectedDay])

    const changeDate = (d:string) => {
        dispatch(setDay(d));
    }
    
    return (
        <Row justify="center" style={{background: '#fff', padding: '16px 0'}}>
            <Space wrap size={120}>
                {
                    week.map(d => 
                        <Space key={d} direction='vertical' align='center'>
                            <Button type={d === selectedDay ? 'primary' : 'text'} shape="circle" size="large" onClick={()=>changeDate(d)}>{dayjs(d).format('dd')}</Button>
                            {dayjs(d).format('MM / DD')}
                        </Space>
                    )
                }
            </Space>
        </Row>
    )
}

export default WeekButton;