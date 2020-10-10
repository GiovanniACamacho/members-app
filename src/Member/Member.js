import React, { useState, useEffect } from 'react';
import './Member.css';
import { useParams } from 'react-router-dom';
import { ClerkService } from '../clerk/clerk.service';
import { Card, Empty, Space, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MemberDetails from './MemberDetails';
import MemberContactInfo from './MemberContactInfo';
import MemberCommittees from './MemberCommittees';
import MemberVoteInfo from './MemberVoteInfo';
import { environment } from '../environment';

export default function Member() {
    const params = useParams();
    const { id } = params;
    const imgUrl = `${environment.imgUrl}/${id}.jpg`;
    const [ clerkService ] = useState(new ClerkService());
    const [ member, setMember ] = useState({});
    const [ loading, setLoading ] = useState(false);

    /**
     * Parse the response to update the member details
     * @param {} data - server response
     */
    const parseResponse = (data = {}) => {
        let item = {};
        const { results } = data;
        if (Array.isArray(results) && results.length) {
            item = results[0];
        }
        setMember(item);
    };

    /**
     * Returns the member's formal name
     * @returns {string}
     */
    const formalName = () => {
        if (member._id) {
            const { officialName: name, congresses } = member;
            const [ info ] = congresses;
            const prefix = info.position.substr(0, 3);
            return `${prefix}. ${name}`;
        }
    };

    /**
     * Load member details
     */
    useEffect(() => {
        setLoading(true);
        clerkService.getMemberDetails(id)
            .then(data => parseResponse(data))
            .catch(() => setMember({}))
            .finally(() => setLoading(false));
    }, [ clerkService, id ]);

    return (
        <div>
            <Card title={
                <div>
                    <Space>
                        <ArrowLeftOutlined onClick={() => window.history.back()} />
                        <span>{formalName()}</span>
                    </Space>
                    <div>
                        <img src={imgUrl} alt="Profile" width="150" />
                    </div>
                </div>
                }
                loading={loading}>
                { member._id ?
                    <div>
                        <MemberDetails
                            id={member._id}
                            isActive={member.active === 'yes' ? true : false}
                            activeDate={member.oathOfOfficeDate}
                            info={member.congresses[0]}
                            address={member.addresses[0]}
                        />
                        <Divider />
                        <MemberContactInfo address={member.addresses[1]} />
                        <Divider />
                        <MemberCommittees info={member.congresses[0]} />
                        <Divider />
                        <MemberVoteInfo id={member._id} />
                    </div> :
                    <Empty />
                }
            </Card>
        </div>
    )
}