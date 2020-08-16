import React from 'react';
import { List, Space, Button, Tooltip } from 'antd';
import './Member.css';
import { CheckCircleTwoTone } from '@ant-design/icons';

/**
 * Basic date formatter
 * @param {string} dateStr - date to format
 * @returns {string}
 */
const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', options);
}

export default function Member(props) {
    const { name, info, isActive, activeDate } = props;
    const [ party ] = info.partyAffiliations;
    const { stateCode, stateDistrict } = info;
    const activeTooltip = `Active member since ${formatDate(activeDate)}`;
    const buttonRef = React.createRef();

    return (
        <List.Item
            actions={[<Button ref={buttonRef} htmlType="button">more info</Button>]}>
            <List.Item.Meta
                title={
                    <Space>
                        <span>{name}</span>
                        { isActive ? <Tooltip title={activeTooltip}><CheckCircleTwoTone twoToneColor="#52c41a" /></Tooltip> : null}
                    </Space>
                }
                description={
                    <Space>
                        <span>{party.name}</span> - 
                        <span>{stateCode}</span>
                        <span>({stateDistrict} District)</span>
                    </Space>
                }
            />
        </List.Item>
    );
}