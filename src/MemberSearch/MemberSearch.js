import React from 'react';
import './MemberSearch.css';
import { UserOutlined } from '@ant-design/icons';
import { Input} from 'antd';

export default function MemberSearch(props) {
    const { onSearch } = props;
    return (
        <Input.Search
            placeholder="Search Member by Name"
            prefix={<UserOutlined />}
            onSearch={onSearch}
            style={{ width: 400 }}
            allowClear="true"
        />
    );
}