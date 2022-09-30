import React from 'react';
import './Banner.scss';

const Banner = (props: {heading: string, cssClass: string}) => {
    return (
        <div className={props.cssClass}>
            <h1>{props.heading}</h1>
        </div>
    );
};
export default Banner;
