import { Layout, Space, Row, Input, Button, Switch } from 'antd';
import dayjs from 'dayjs';
import { RootState, setSearch, setDay, changeTheme, setThisWeek} from '../store'
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const { Header } = Layout;
const { Search } = Input;

function HeaderBar () {
    const dispatch :Dispatch = useDispatch();
    let week = useSelector((state :RootState) => state.week);
    let selectedDay = useSelector((state :RootState) => state.selectedDay);

    useEffect(() => {
        let inWeek = week.find(w => w === selectedDay);
        inWeek ?? dispatch(setThisWeek())
    }, [selectedDay])
    
    const setToday = () => {
        dispatch(setDay(dayjs().format('YYYY-MM-DD')));                
    }
    const onSearch = (value: string) => {
        dispatch(setSearch(value));
    }
    const changeMode = (value: boolean) => {
        dispatch(changeTheme(value));
    }

    return (
    <Header>
        <Row justify="space-between" align={'middle'}>
        <Space wrap style={{color: '#eb2f96'}}>
            <div>ha0 Todo❣️</div>
            <Button type='text' style={{color: '#eb2f96'}} onClick={setToday}>{dayjs().format('MM/DD')}</Button>
        </Space>
        <Space>
            <Switch checkedChildren="☀️" unCheckedChildren="🌙" defaultChecked onChange={changeMode}/>
            <Search placeholder="search" style={{ width: 200, verticalAlign: 'middle' }} 
                onSearch={value => onSearch(value)} allowClear/>
        </Space>
        </Row>
    </Header>
    )
}

export default HeaderBar;