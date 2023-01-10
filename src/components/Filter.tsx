
import { Dropdown, Button, MenuProps } from 'antd';
import { ControlTwoTone, FilterTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store'
import { Dispatch } from 'redux';
import { ItemType } from 'antd/es/menu/hooks/useItems';

function Filter() {
    let tagList = useSelector((state :RootState) => state.tag);
    const dispatch :Dispatch = useDispatch();

    let tagFilters :ItemType[] = [];
    tagList.forEach((tag, i) => {
        tagFilters.push({key: tag.tag, label: tag.tag, icon: <FilterTwoTone twoToneColor={tag.color}/>})
    });

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };

    const items: MenuProps['items'] = [
        {
            key: 'all',
            label: '전체보기',
        },
        {
            key: 'Incomplete',
            label: '미완료'
        },
        {
            key: 'tag',
            type: 'group',
            label: '태그',
            children: tagFilters
        },
    ]
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
        selectable: true,
        defaultSelectedKeys: ['1']
    }

    return (
        <>
        <Dropdown menu={menuProps} placement="bottom">
            <Button><ControlTwoTone style={{fontSize: '15px'}} twoToneColor="#eb2f96"/> 필터</Button>
        </Dropdown>
        </>
    )
}

export default Filter;