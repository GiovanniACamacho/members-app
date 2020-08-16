import React, { useState, useEffect, useCallback } from 'react';
import './MemberVoteInfo.css';
import { ClerkService } from '../clerk/clerk.service';
import { Table } from 'antd';
import { formatDate, alphaSort, dateSort } from '../utils/utils';

export default function MemberVoteInfo(props) {
    const { id } = props;
    const clerkService = new ClerkService();
    const [ voteData, setVoteData ] = useState([]);
    const tableColumns = [{
        title: 'Legistature',
        dataIndex: 'legisNum',
        sorter: (a, b) => alphaSort(a.legisNum, b.legisNum)
    }, {
        title: 'Description',
        dataIndex: 'description',
        width: 600
    }, {
        title: 'Date',
        dataIndex: 'startDate',
        render: (val) => formatDate(val),
        sorter: (a, b) => dateSort(a.startDate, b.startDate)
    }, {
        title: 'Vote',
        dataIndex: 'vote',
        sorter: (a, b) => alphaSort(a.vote, b.vote)
    }];

    /**
     * Filter the member's vote history from all the events
     * TODO: Use OData filter query to fetch this info by member id
     */
    const filterVoteData = useCallback((events) => {
        const data = events.filter(event => event.members.some(member => member.usCongressBio === id));
        const votes = data.map((event, idx) => {
            const item = {
                key: idx,
                startDate: event.startDate,
                legisNum: event.legisNum,
                description: event.description
            };
            const vote = event.members.find(member => member.usCongressBio === id);
            item.vote = vote.vote;
            return item;
        });
        return votes;
    }, [ id ]);

    /**
     * Load the event data and filter the votes by member
     */
    useEffect(() => {
        clerkService.getMembersVoteInfo()
            .then(resp => filterVoteData(resp.results))
            .then(data => setVoteData(data));
    }, [ clerkService, filterVoteData ]);

    return (
        <section>
            <h4>Vote Information</h4>
            <Table
                columns={tableColumns}
                dataSource={voteData}
            />
        </section>
    )
}