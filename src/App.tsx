import React, { useState } from 'react';
import './App.css';
import { ConfigProvider, Layout, Menu, Dropdown, Space, Collapse, Card, Tooltip, Button, Row, theme, Divider, Checkbox, Progress, Badge, Typography, Input,  DatePicker, TimePicker, MenuProps } from 'antd';
import { ClockCircleOutlined, DeleteTwoTone, EditTwoTone, FilterTwoTone, ControlTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Header, Footer, Content } = Layout;
const { Search } = Input;
const { Text } = Typography;
const { Panel } = Collapse;

const ButtonGroup = Button.Group;

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
    token: { colorBgContainer, pink },
  } = theme.useToken();

  const [ input, setInput ] = useState(false);

  return (
    <div className="App">
      <ConfigProvider theme={{ token: { colorPrimary: pink } }}>
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
              <ButtonGroup style={{paddingRight: '10px'}}>
                <Tooltip placement="bottom" title={'지난주'}>
                  <Button>👈🏻</Button>
                </Tooltip>
                <Tooltip placement="bottom" title={'다음주'}>
                  <Button>👉🏻</Button>
                </Tooltip>
              </ButtonGroup>
              <Dropdown menu={{ items,  selectable: true, defaultSelectedKeys: ['3']}} placement="bottom">
                <Button><ControlTwoTone style={{fontSize: '15px'}} twoToneColor="#eb2f96"/> 보기</Button>
              </Dropdown>
            </Row>
            <Row justify="center" style={{background: colorBgContainer, padding: '16px 0'}}>
              <Space wrap size={120}>
                <Space direction='vertical' align='center'>
                  <Button type="text" shape="circle" size="large">월</Button>
                  <div>1/1</div>
                </Space>
                
                <Button type="text" shape="circle" size="large">화</Button>
                <Button type="text" shape="circle" size="large">수</Button>
                <Button type="text" shape="circle" size="large">목</Button>
                <Button type="text" shape="circle" size="large">금</Button>
                <Button type="text" shape="circle" size="large">토</Button>
                <Button type="text" shape="circle" size="large">일</Button>
              </Space>
            </Row>
          {/* <Divider orientation="left">기한이 지난(2) 🗓</Divider> */}
            <Collapse defaultActiveKey={['1']} style={{marginTop: '20px'}} ghost>
              <Panel header="기한이 지난(2) 🗓" key="1" style={{textAlign: 'left'}}>
                <Badge.Ribbon text="D+3" color="pink">
                  <Card size='small' style={{margin: '4px 0'}}>
                    <Row justify='space-between'>
                      <Checkbox><Text>기한이 지난1</Text></Checkbox>
                      <Text type="danger" style={{marginRight: '30px'}}>
                        <ClockCircleOutlined></ClockCircleOutlined> 12/29
                      </Text>
                    </Row>                            
                  </Card>
                </Badge.Ribbon>
                <Badge.Ribbon text="D+1" color="pink">
                  <Card size='small'>
                    <Row justify='space-between'>
                      <Checkbox>기한이 지난 2</Checkbox>
                      <Text type="danger" style={{marginRight: '30px'}}>
                        <ClockCircleOutlined></ClockCircleOutlined> 12/31
                      </Text>
                    </Row>     
                  </Card>
              </Badge.Ribbon>
              </Panel>
            </Collapse>
            <Divider orientation="left">오늘의 할일(3) ✍🏻</Divider>
            <Progress percent={30.9} status="active" strokeColor={{ from: '#fb9ec4', to: '#8865ff' }} />
            <div style={{textAlign: 'center', padding: '15px 0'}}>조금 더 분발하세요!💪🏻</div>
              {
                input 
                ?
                <Card bordered={false} >
                  <Input placeholder='오늘의 할일은?'></Input>
                  <Divider></Divider>
                  <Row justify={'space-between'}>
                    <Space wrap style={{color: pink}}>
                      <DatePicker />
                      <TimePicker defaultValue={dayjs('12:08', 'HH:mm')} format={'HH:mm'} />
                    </Space>
                    <Space wrap style={{color: pink}}>
                      <Button onClick={()=> setInput(!input)}>취소</Button>
                      <Button type="primary">저장</Button>
                    </Space>
                  </Row>
                  
                </Card> 
                : 
                <Card size='small' style={{margin: '4px 0', textAlign: 'left'}} onClick={()=> setInput(!input)}>
                  {/* <Button size='small' style={{width: '15px', height: '15px', padding: '10px'}}>+</Button> */}
                  <PlusSquareTwoTone style={{fontSize: '18px'}} twoToneColor="#eb2f96"/> 작업 추가하기
                </Card>
              }

            <Card size='small' style={{margin: '4px 0'}}>
              <Row justify='space-between'>
                <Checkbox>할일 1</Checkbox>
                  <Space wrap style={{marginLeft: 'auto', gap: '0'}}>
                    <div style={{width: '174px', textAlign: 'right'}}>
                      <ClockCircleOutlined></ClockCircleOutlined> 12/31 24:24
                    </div>                    
                    <Button type='ghost' size='small'><EditTwoTone /></Button>
                    <Button type='ghost' size='small'><DeleteTwoTone twoToneColor="#eb2f96"/></Button>
                  </Space>                 
              </Row>
            </Card>
            <Card size='small' style={{margin: '4px 0'}}>
              <Row justify='space-between'>
                <Checkbox>할일 2</Checkbox>
                  <Space wrap style={{marginLeft: 'auto', gap: '0'}}>
                    <div style={{width: '174px', textAlign: 'right'}}>
                      <ClockCircleOutlined></ClockCircleOutlined> 01/01 09:00
                    </div>                    
                    <Button type='ghost' size='small'><EditTwoTone /></Button>
                    <Button type='ghost' size='small'><DeleteTwoTone twoToneColor="#eb2f96"/></Button>
                  </Space>    
              </Row>     
            </Card>
          </Content>
          <Footer>
            ha0 Todo❣️ ©2023 Created by ha0peno
          </Footer>
        </Layout>
      </ConfigProvider>
    </div>
  );
}

export default App;
