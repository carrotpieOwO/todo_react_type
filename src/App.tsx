import './App.css';
import { Layout, Dropdown, Space, Button, Row, theme, Input, MenuProps } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';

import WeekNavi from './components/WeekNavi';
import DayNavi from './components/DayNavi';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import ProgressBar from './components/ProgressBar';
import OverdueList from './components/OverdueList';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const items: MenuProps['items'] = [
  {
    key: '1',
    type: 'group',
    label: '레이아웃',
    children: [
      {
        key: '1-1',
        label: '🕖 타임라인'
      }
    ]
  },
  {
    key: '2',
    type: 'group',
    label: '필터',
    children: [
      {
        key: '2-1',
        label: '없음'
      },
      {
        key: '2-2',
        label: '미완료된'
      },
      {
        key: '2-3',
        label: '태그'
      }
    ]
  },
]

function App() {
  const {
    token: { pink },
  } = theme.useToken();

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
            <Dropdown menu={{ items,  selectable: true, defaultSelectedKeys: ['3']}} placement="bottom">
              <Button><ControlTwoTone style={{fontSize: '15px'}} twoToneColor="#eb2f96"/> 보기</Button>
            </Dropdown>
          </Row>
          <DayNavi/>
          <OverdueList/>
          <ProgressBar/>
          <TodoForm/>
          <TodoList/>
        </Content>
        <Footer style={{textAlign: 'center'}}>
          ha0 Todo❣️ ©2023 Created by ha0peno
        </Footer>
      </Layout>
  );
}

export default App;
