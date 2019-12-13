import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

export default class StoryView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="StoryView view">
                    <Title text="Story" />
                </div>
            </div>
        )
    }
}
