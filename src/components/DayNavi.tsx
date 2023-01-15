import { Space, Button, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setDay, setAddForm } from '../store'
import { Dispatch } from 'redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect } from 'react';
dayjs.locale('ko');

const { Text } = Typography;

function WeekButton() {
    const dispatch :Dispatch = useDispatch();
    let selectedDay = useSelector((state :RootState) => state.selectedDay);
    let week = useSelector((state :RootState) => state.week);
    let selectedTheme = useSelector((state :RootState) => state.theme);
    let bgStyleConfig = {
      background: selectedTheme ? '#fff' : '#333',
      padding: '16px 0'
    }

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
        <Row justify="center" style={bgStyleConfig}>
            <Space wrap size={120}>
                {
                    week.map(d => 
                        <Space key={d} direction='vertical' align='center'>
                            <Button type={d === selectedDay ? 'primary' : 'text'} shape="circle" size="large" onClick={()=>changeDate(d)}>{dayjs(d).format('dd')}</Button>
                            <Text>{dayjs(d).format('MM / DD')}</Text>
                        </Space>
                    )
                }
            </Space>
        </Row>
    )
}

export default WeekButton;