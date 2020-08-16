import React from 'react';
import './MemberDetails.css';
import { Descriptions } from 'antd';
import { formatDate } from '../utils/utils';
import { states, territories, freeAssociatedStates } from '../model/states';

export default function MemberDetails(props) {
    const { isActive, activeDate, info, address } = props;
    const { addressLocality: city, addressRegion: region } = address;
    const stateList = {
        ...states,
        ...territories,
        ...freeAssociatedStates
    };

    return (
        <Descriptions size="small" column={2}>
            <Descriptions.Item label="Status">{isActive ? 'Active' : 'Inactive'}</Descriptions.Item>
            <Descriptions.Item label="Date of Oath">{formatDate(activeDate)}</Descriptions.Item>
            <Descriptions.Item label="Affiliation">{info.partyAffiliations[0].name}</Descriptions.Item>
            <Descriptions.Item label="State">{stateList[info.stateCode]}</Descriptions.Item>
            <Descriptions.Item label="District">{info.stateDistrict}</Descriptions.Item>
            <Descriptions.Item label="Home Address">{city}, {region}</Descriptions.Item>
        </Descriptions>
    )
}