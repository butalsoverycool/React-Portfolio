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
            <div className="HomePage">
                <Title text="Home" />
            </div>
        );
    }
}
