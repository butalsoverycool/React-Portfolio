import React, { Component } from 'react';

// shared
import Title from '../Title.js';

// funcs
import * as FUNCS from '../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import { View_styled, content, ContentContainer } from './index';

export default class StoryView extends Component {
    constructor(props) {
        super(props);

        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);
    }

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
            console.log(this.props.prevNavLink);
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
            <React.Fragment>
                <View_styled className="StoryView view" fadeIn ref={this.elem}>
                    <Title text="Story" />

                    <ContentContainer className='content default'>
                        {content}
                    </ContentContainer>
                </View_styled>
            </React.Fragment>
        )
    }
}
