import React, { Component } from 'react';

import Slider from '../groups/Slider';

export default class Home extends Component {

    render() {
        const { showModal, toggleLoading } = this.props;
        return (
            <div className="home">
                <Slider toggleLoading={toggleLoading} showModal={showModal}></Slider>
            </div>
        )
    }
}