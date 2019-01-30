import React, {Component} from 'react';
import {FaStar} from "react-icons/fa";


export class Stars extends Component {

    render() {
        return (
            <span className={this.props.class}>
                {Array.from(Array(this.props.rating), (e, i) => {
                    return <FaStar key={i}>{i}</FaStar>
                })}
            </span>
        );
    }
}

export default Stars;
