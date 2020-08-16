import React from 'react';
import './MemberContactInfo.css';

export default function  MemberContactInfo(props) {
    const { address } = props;
    const {
        streetAddress,
        addressLocality: city,
        addressRegion: region,
        postalCode,
        telephone
    } = address;

    return (
        <section>
            <h4>Contact Information</h4>
            <div>
                <div><span>{streetAddress}</span></div>
                <div><span>{city}, {region} {postalCode}</span></div>
                <div><span>Telephone: {telephone}</span></div>
            </div>
        </section>
    )
}