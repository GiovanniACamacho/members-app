import React, { useState } from 'react';
import { Select, Space, Button } from 'antd';
import './MemberFilter.css';
import { states, territories, freeAssociatedStates } from '../model/states';

export default function MemberFilter(props) {
    const { onFilterChange } = props;
    const [ filters, setFilters ] = useState({});
    const [ vals, setValues ] = useState({});
    const stateList = {
        ...states,
        ...territories,
        ...freeAssociatedStates
    };

    /**
     * Filter the data by affiliation
     * Ex. Republican or Democrat
     * @param {string} val - party affiliation selected
     */
    const filterByAffiliation = (val) => {
        const query = (val) ? `congresses/partyAffiliations/name eq '${val}'` : null;
        const newFilters = { ...filters, affiliation: query };
        setValues({ ...vals, affiliation: val });
        updateFilters(newFilters);
    };

    /**
     * Filter the data by Congress chamber
     * Ex. House or Senate
     * @param {string} val - chamber selected
     */
    const filterByChamber = (val) => {
        const query = (val) ? `congresses/chamber eq '${val}'` : null;
        const newFilters = { ...filters, chamber: query };
        setValues({ ...vals, chamber: val });
        updateFilters(newFilters);
    };

    /**
     * Filter the data by if the member is active or not
     * Ex. yes or no
     * @param {string} val - active selected
     */
    const filterByStatus = (val) => {
        const query = (val) ? `active eq '${val}'` : null;
        const newFilters = { ...filters, status: query };
        setValues({ ...vals, status: val });
        updateFilters(newFilters);
    };

    /**
     * Filter the data by state
     * Ex. AL or FL
     * @param {string} val - state selected
     */
    const filterByState = (val) => {
        const query = (val) ? `congresses/stateCode eq '${val}'` : null;
        const newFilters = { ...filters, state: query };
        setValues({ ...vals, state: val });
        updateFilters(newFilters);
    };

    /**
     * Returns true if the input matches the State
     * @param {string} input 
     * @param {any} option 
     * @returns {boolean}
     */
    const filterStateOption = (input, option) => {
        return option.children.toLowerCase().includes(input.toLowerCase());
    };

    /**
     * Call onFilterChange every time a filter is updated
     */
    const updateFilters = (newFilters) => {
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    /**
     * Returns true if there are filters selected
     * @returns {boolean}
     */
    const hasFilters = () => {
        const keys = Object.keys(filters);
        if (keys.length && keys.some(key => filters[key])) {
            return true;
        }
        return false;
    };

    /**
     * Clear all the filters
     */
    const clearFilters = () => {
        const empty = { status: null, chamber: null, state: null, affiliation: null };
        setValues(empty);
        updateFilters(empty);
    };

    return (
        <Space>
            <label>Filters: </label>
            <Select placeholder="Status" allowClear="true" onChange={filterByStatus} value={vals.status} style={{ width: 110 }}>
                <Select.Option value="yes">Active</Select.Option>
                <Select.Option value="no">Inactive</Select.Option>
            </Select>
            <Select placeholder="Chamber" allowClear="true" onChange={filterByChamber} value={vals.chamber}>
                <Select.Option value="House">House</Select.Option>
                <Select.Option value="Senate">Senate</Select.Option>
            </Select>
            <Select placeholder="State"
                allowClear="true"
                style={{ minWidth: 120 }}
                onChange={filterByState}
                showSearch="true"
                filterOption={filterStateOption}
                value={vals.state}>
                    {Object.keys(stateList).map(code => <Select.Option key={code} value={code}>{stateList[code]}</Select.Option>)}
            </Select>
            <Select placeholder="Affiliation" allowClear="true" onChange={filterByAffiliation} value={vals.affiliation}>
                <Select.Option value="Democrat">Democrat</Select.Option>
                <Select.Option value="Independent">Independent</Select.Option>
                <Select.Option value="Republican">Republican</Select.Option>
            </Select>
            <Button type="link" disabled={!hasFilters()} onClick={clearFilters}>Clear all filters</Button>
        </Space>
    );
}