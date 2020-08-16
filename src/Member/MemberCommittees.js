import React from 'react';
import { Row, Col } from 'antd';

export default function MemberCommittees(props) {
    const { info } = props;
    const { committeeAssignments: committees = [], subCommitteeAssignments: subCommittees = [] } = info
    return (
        <Row>
            <Col span="12">
                <h4>Committees</h4>
                <div className="block">
                    { committees ?
                        committees.map(c => <div key={c.committeeCode}>{c.committeeName}</div>) :
                        <div>No committees found</div>
                    }
                </div>
            </Col>
            <Col span="12">
                <h4>Sub-Committees</h4>
                <div className="block">
                    { subCommittees ?
                        subCommittees.map(c => <div key={c.subCommitteeCode}>{c.subCommitteeName}</div>) :
                        <div>No Sub-Committees found</div>
                    }
                </div>
            </Col>
        </Row>
    );
}