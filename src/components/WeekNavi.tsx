import { Tooltip, Button } from 'antd';
import { useDispatch } from 'react-redux'
import { setNextWeek, setPrevWeek } from '../store'
import { Dispatch } from 'redux';

const ButtonGroup = Button.Group;

function WeekNavi() {
    const dispatch :Dispatch = useDispatch();
    
    const prevWeek = () => {
        dispatch(setPrevWeek());       
    }

    const nextWeek = () => {
        dispatch(setNextWeek());        
    }

    return (
        <ButtonGroup style={{paddingRight: '10px'}}>
            <Tooltip placement="bottom" title={'지난주'}>
                <Button onClick={prevWeek}>👈🏻</Button>
            </Tooltip>
            <Tooltip placement="bottom" title={'다음주'}>
                <Button onClick={nextWeek}>👉🏻</Button>
            </Tooltip>
        </ButtonGroup>
    )
}

export default WeekNavi;