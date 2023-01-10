import { FloatButton } from 'antd';
import { ScheduleTwoTone, ProfileTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setLayout } from '../store'
import { Dispatch } from 'redux';

function LayoutButton() {
    const dispatch :Dispatch = useDispatch();

    return (
        <FloatButton.Group trigger="hover" type="primary" style={{ right: 94 }}
            icon={<ScheduleTwoTone twoToneColor="#eb2f96" />}>
            <FloatButton icon={<ProfileTwoTone twoToneColor="#eb2f96"/>} onClick={() => (dispatch(setLayout('board')))}/>
            <FloatButton icon={<ClockCircleTwoTone twoToneColor="#eb2f96"/>} onClick={() => (dispatch(setLayout('timeLine')))}/>
        </FloatButton.Group>
    )
}

export default LayoutButton;