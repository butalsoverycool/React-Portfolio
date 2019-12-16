import React, { Component } from 'react';

// shared
import Title from '../../Shared/Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import { View_styled } from '../index';

export default class NewsView extends Component {
    constructor(props) {
        super(props);

        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);

        window.scrollTo(0, this.props.scrollPos);
    }

    scrollHandler() {
        // if at bottom...
        if (FUNCS.reachedBottom(this.elem.current)) {
            // remove listener and go to next view
            document.removeEventListener('scroll', this.scrollHandler);
            this.props.nextNavLink.click();
        }

        else if (FUNCS.reachedTop(this.elem.current)) {
            document.removeEventListener('scroll', this.scrollHandler);
            this.props.prevNavLink.click();
        }
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        return (
            <View_styled className="NewsView" fadeIn ref={this.elem}>
                <Title text="News" />
            </View_styled>
        );
    }
}