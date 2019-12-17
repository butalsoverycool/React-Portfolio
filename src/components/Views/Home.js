// react
import React, { Component } from 'react';

// shared
import Title from '../Title.js';

// funcs
import * as FUNCS from '../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import { View_styled } from './index';

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);

        window.scrollTo(0, this.props.scrollPos);
    }

    // få denna komponent att fatta om den renderades pga reached botten lr top lr klick
    // detta för att scrollTo ska kunna anpassas

    scrollHandler() {
        // if at bottom...
        if (FUNCS.reachedBottom(this.elem.current)) {
            // remove listener and go to next view, with scrollpos
            document.removeEventListener('scroll', this.scrollHandler);
            this.props.setScrollPos(0);
            this.props.nextNavLink.click();
        }

        else if (FUNCS.reachedTop(this.elem.current)) {
            document.removeEventListener('scroll', this.scrollHandler);
            this.props.setScrollPos(200);
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
            <View_styled className='HomeView' fadeIn ref={this.elem}>
                <Title text="Home" />
            </View_styled>
        );
    }
}
