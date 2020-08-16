import React from 'react';
import { List, Space, Button, Tooltip } from 'antd';
import './MemberItem.css';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../utils/utils';

export default function MemberItem(props) {
    const { name, info, isActive, activeDate, id } = props;
    const [ party ] = info.partyAffiliations;
    const { stateCode, stateDistrict } = info;
    const activeTooltip = `Active member since ${formatDate(activeDate)}`;
    const buttonRef = React.createRef();
    const history = useHistory();
    const link = `/member/${id}`;

    /**
     * Navigate to member's page
     */
    const navigateTo = () => {
        history.push(link)
    }

    return (
        <List.Item
            actions={[<Button ref={buttonRef} htmlType="button" onClick={navigateTo}>more info</Button>]}>
            <List.Item.Meta
                title={
                    <Space>
                        <a className="link" href={link}>{name}</a>
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