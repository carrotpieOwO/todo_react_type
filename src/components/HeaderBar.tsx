import { Layout, Space, Row, Input, Button, Switch } from 'antd';
import dayjs from 'dayjs';
import { setSearch, setDay, changeTheme } from '../store'
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

const { Header } = Layout;
const { Search } = Input;

function HeaderBar () {
    const dispatch :Dispatch = useDispatch();

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