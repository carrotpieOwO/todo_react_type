import './App.css';
import { Layout, Space, Row, theme, Input } from 'antd';

import WeekNavi from './components/WeekNavi';
import DayNavi from './components/DayNavi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ProgressBar from './components/ProgressBar';
import OverdueList from './components/OverdueList';
import Filter from './components/Filter';
import TimeLine from './components/TimeLine';
import LayoutButton from './components/LayoutButton';

import { useSelector } from 'react-redux'
import { RootState } from './store'

const { Header, Footer, Content } = Layout;
const { Search } = Input;


function App() {
  const {
    token: { pink },
  } = theme.useToken();

  let layout = useSelector((state :RootState) => state.layout);

  return (
      <Layout style={{height:'100vh'}}>
        <Header>
          <Row justify="space-between" align={'middle'}>
            <Space wrap style={{color: pink}}>
              <div>ha0 Todo❣️</div>
              <div>1/1☀️</div>
            </Space>
            <Space>
              <Search placeholder="search" style={{ width: 200, verticalAlign: 'middle' }} onSearch={value => console.log(value)} allowClear/>
            </Space>
          </Row>
        </Header>
        <Content style={{ padding: '0 50px', margin: '16px 0' }}>
          <Row justify="end" align={'middle'} style={{paddingBottom: '10px'}}>            
              <WeekNavi/>
              <Filter/>                        
          </Row>
          <DayNavi/>
          <OverdueList/>
          <ProgressBar/>
          <TodoForm/>
          {
            layout === 'board' ? <TodoList/> : <TimeLine/>
          }
          
        </Content>
        <Footer style={{textAlign: 'center'}}>
          ha0 Todo❣️ ©2023 Created by ha0peno
        </Footer>
        <LayoutButton/>
      </Layout>
  );
}

export default App;
