import React from 'react';
import { MemberFilter } from '../MemberFilter/MemberFilter';

export default function MemberListHeader() {
    return (
        <div className="row">
            <div className="col">
                <MemberFilter onFilterChange={(data) => setParams({...params, ...data })}/>
            </div>
            <div className="flex"></div>
            <div className="col">
                <Input.Search
                    placeholder="Search Member"
                    prefix={<UserOutlined />}
                    onSearch={value => console.log(value)}
                    style={{ width: 400 }}
                    allowClear="true"
                />
            </div>
        </div>
    );
}