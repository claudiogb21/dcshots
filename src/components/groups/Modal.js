import React, { Component } from 'react';

export default class Modal extends Component {

    render() {
        const { children, unmountingModal } = this.props;

        return (
            <div className={"modal" + (unmountingModal ? " fadeOut" : " fadeIn")}>
                {children}
            </div>
        )
    }
}