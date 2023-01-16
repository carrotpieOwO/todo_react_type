import { Space, Button, Row, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setDay, setThisWeek } from '../store'
import { Dispatch } from 'redux';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect } from 'react';
dayjs.locale('ko');

const { Text } = Typography;

function DayButton() {
    const dispatch :Dispatch = useDispatch();
    let selectedDay = useSelector((state :RootState) => state.selectedDay);
    let week = useSelector((state :RootState) => state.week);
    let selectedTheme = useSelector((state :RootState) => state.theme);
    let bgStyleConfig = {
      background: selectedTheme ? '#fff' : '#333',
      padding: '16px 0'
    }

    let inWeek = week.find(w => w === selectedDay);

    // 이번주/다음주 버튼으로 week를 변경했을 경우 해당 week의 첫번째 날을 선택한다.
    useEffect(() => {
        inWeek ?? dispatch(setDay(week[0]));
    }, [week])

    // 출력된 날짜버튼 중 선택한 날짜가 없을 경우 해당 날짜가 있는 주간으로 날짜버튼을 생성한다.
    useEffect(() => {
        inWeek ?? dispatch(setThisWeek())
    }, [selectedDay])

    useEffect(() => {
        dispatch(setDay(selectedDay))
    }, [])

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

export default DayButton;