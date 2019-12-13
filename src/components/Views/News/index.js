import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

export default class NewsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="NewsView view">
                <Title text="News" />
            </div>
        );
    }
}