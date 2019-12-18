// react
import React, { Component } from 'react';

// shared
import Title from '../Title.js';

// funcs
import * as FUNCS from '../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import { View_styled, content, ContentContainer } from './index';

//children
import CaseCards from '../CaseCards';

// data


export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        console.log('removing scrollhandler...');
        window.removeEventListener('scroll', this.scrollHandler);
    }

    // få denna komponent att fatta om den renderades pga reached botten lr top lr klick
    // detta för att scrollTo ska kunna anpassas

    scrollHandler() {
        // if at bottom...
        if (FUNCS.reachedBottom(this.elem.current)) {
            console.log('reached bottom')
            this.props.setScrollPos(10);
            this.props.nextNavLink.click();
        }

        else if (FUNCS.reachedTop(this.elem.current)) {
            console.log('reached top')
            this.props.setScrollPos(400);
            this.props.prevNavLink.click();
        }
    }

    render() {
        return (
            <React.Fragment>
                <View_styled className='HomeView view' fadeIn ref={this.elem}>
                    <Title text="Home" />
                    <CaseCards />
                </View_styled>
            </React.Fragment>
        );
    }
}
