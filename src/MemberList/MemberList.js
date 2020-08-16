import React, { useEffect, useState } from 'react';
import Member from '../Member/Member';
import { ClerkService } from '../clerk/clerk.service';
import { List, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import './MemberList.css';
import MemberFilter from '../MemberFilter/MemberFilter';
import MemberSearch from '../MemberSearch/MemberSearch';

export default function MemberList() {
    const [ clerkService ] = useState(new ClerkService());
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ params, setParams ] = useState({ $orderby: 'sortName' });
    const [ filters, setFilters ] = useState({});

    /**
     * Load member data based on query parameters
     * TODO: Add error handling
     */
    useEffect(() => {
        setLoading(true);
        clerkService.getMembers(params).then(data => setData(data)).finally(() => setLoading(false));
    }, [ clerkService, params ]);


    /**
     * Map the filter parameters as a query string
     * @param filters - filter object
     * @returns {string}
     */
    const mapFilters = (filters) => {
        const keys = Object.keys(filters);
        const vals = keys.filter(key => filters[key]);
        const query = vals.map(key => filters[key]).join(' and ');
        return query;
    };

    /**
     * Paginate between results
     * @param {number} page - current page number
     * @param {number} pageSize - current page size
     */
    const paginate = (page, pageSize) => {
        setParams({ ...params, $skip: pageSize * (page - 1), $top: pageSize })
    };

    /**
     * Do a search based on a input value
     * @param {string} val 
     */
    const handleSearch = (val) => {
        const search = (val) ? `substringof('${val}', officialName)` : null;
        filterData({ ...filters, search });
    };

    /**
     * Filter the data based on selected values
     * @param {string} data - filter query
     */
    const filterData = (vals) => {
        const newParams = { ...filters, ...vals };
        const data = mapFilters(newParams);
        setFilters(newParams);
        setParams({...params, $skip: 0, $filter: data });
    };

    /**
     * Build the pagination's Total label
     * @param {number} total 
     * @param {number[]} range
     * @returns {string}
     */
    const showTotalMsg = (total, range) => {
        const memberLabel = (total === 1) ? 'member' : 'members';
        return `${range[0]}-${range[1]} of ${total} ${memberLabel}`;
    };

    return (
        <List
            bordered
            header={
                <Row>
                    <Col><MemberFilter onFilterChange={filterData}/></Col>
                    <Col flex="auto"></Col>
                    <Col><MemberSearch onSearch={handleSearch} /></Col>
                </Row>
            }
            pagination={{
                pageSize: 10,
                onChange: paginate,
                onShowSizeChange: paginate,
                total: data.pagination?.count,
                showTotal: showTotalMsg,
                position: 'both'
            }}
            dataSource={data.results}
            loading={loading}
            renderItem={m => <Member key={m._id} name={m.officialName} isActive={m.active === 'yes'} activeDate={m.oathOfOfficeDate} info={m.congresses[0]}  />}
        />
    );
}