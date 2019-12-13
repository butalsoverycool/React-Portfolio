import React, { Component } from 'react';

// style
import './index.scss';

const Title = (props) => {
    return (
        <React.Fragment>
            <header className="Title">{props.text}</header>
        </React.Fragment>
    );
}

export default Title;
