// react
import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

export default class HomeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="HomeView view">
                <Title text="Home" />
            </div>
        );
    }
}
