// react
import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);

        window.scrollTo(0, 100);
    }

    // få denna komponent att fatta om den renderades pga reached botten lr top lr klick
    // detta för att scrollTo ska kunna anpassas

    scrollHandler() {
        // if at bottom...
        if (FUNCS.reachedBottom(this.elem.current)) {
            // remove listener and go to next view
            document.removeEventListener('scroll', this.scrollHandler);
            document.querySelector('.NavLink.story').click();
        }

        else if (FUNCS.reachedTop(this.elem.current)) {
            document.removeEventListener('scroll', this.scrollHandler);
            document.querySelector('.NavLink.contact').click();
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
            <main className='HomeView view fadeIn' ref={this.elem}>
                <Title text="Home" />
            </main>
        );
    }
}
