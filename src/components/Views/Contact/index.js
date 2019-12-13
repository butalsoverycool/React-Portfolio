import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

export default class ContactView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ContactView view">
                <Title text="Contact" />
            </div>
        );
    }
}