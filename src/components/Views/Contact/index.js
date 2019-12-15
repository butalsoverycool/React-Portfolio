import React, { Component } from 'react';

// style
import './index.scss';

// shared
import Title from '../../Shared/Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

export default class ContactView extends Component {
    constructor(props) {
        super(props);

        this.elem = React.createRef();

        this.scrollHandler = this.scrollHandler.bind(this);

        window.scrollTo(0, 100);
    }

    scrollHandler() {
        // if at bottom...
        if (FUNCS.reachedBottom(this.elem.current)) {
            // remove listener and go to next view
            document.removeEventListener('scroll', this.scrollHandler);
            document.querySelector('.NavLink.home').click();
        }

        else if (FUNCS.reachedTop(this.elem.current)) {
            document.removeEventListener('scroll', this.scrollHandler);
            document.querySelector('.NavLink.news').click();
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
            <main className="ContactView view fadeIn" ref={this.elem}>
                <Title text="Contact" />
            </main>
        );
    }
}