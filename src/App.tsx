import './App.css';
import { ConfigProvider, theme, Layout, Row } from 'antd';

import WeekNavi from './components/WeekNavi';
import DayNavi from './components/DayNavi';
import TodoForm from './components/TodoForm';
import ProgressBar from './components/ProgressBar';
import OverdueList from './components/OverdueList';
import Filter from './components/Filter';
import LayoutButton from './components/LayoutButton';
import HeaderBar from './components/HeaderBar';
import ListTamplate from './components/ListTemplate';
import { useSelector } from 'react-redux'
import { RootState } from './store'

const { Footer, Content } = Layout;

function App() {
  let selectedTheme = useSelector((state :RootState) => state.theme);
  let themeConfig = {
    algorithm: selectedTheme ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {colorPrimary: '#eb2f96'} 
  }
  return (
    <ConfigProvider theme={themeConfig}>
      <Layout style={{height:'100vh'}}>
        <HeaderBar/>
        <Content style={{ padding: '0 50px', margin: '16px 0' }}>
          <Row justify="end" align={'middle'} style={{paddingBottom: '10px'}}>            
              <WeekNavi/>
              <Filter/>                        
          </Row>
          <DayNavi/>
          <OverdueList/>
          <ProgressBar/>
          <TodoForm/>
          <ListTamplate/>          
        </Content>
        <Footer style={{textAlign: 'center'}}>
          ha0 Todo❣️ ©2023 Created by ha0peno
        </Footer>
        <LayoutButton/>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
