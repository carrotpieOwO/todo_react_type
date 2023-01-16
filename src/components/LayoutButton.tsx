import { FloatButton } from 'antd';
import { ScheduleTwoTone, ProfileTwoTone, ClockCircleTwoTone } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setLayout } from '../store'
import { Dispatch } from 'redux';

export type layoutType = 'board' | 'timeLine';

function LayoutButton() {
    const dispatch :Dispatch = useDispatch();

    const changeLayout = (type:layoutType) => {
        dispatch(setLayout(type));
    }

    return (
        <FloatButton.Group trigger="hover" type="primary" style={{ right: 94 }}
            icon={<ScheduleTwoTone twoToneColor="#eb2f96" />}>
            <FloatButton icon={<ProfileTwoTone twoToneColor="#eb2f96"/>} onClick={() => (changeLayout('board'))}/>
            <FloatButton icon={<ClockCircleTwoTone twoToneColor="#eb2f96"/>} onClick={() => (changeLayout('timeLine'))}/>
        </FloatButton.Group>
    )
}

export default LayoutButton;