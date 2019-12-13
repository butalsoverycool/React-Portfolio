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

        this.scrollHandler = () => {
            // if at bottom...
            if (FUNCS.reachedBottom(this.elem.current)) {
                // remove listener and go to next view
                document.removeEventListener('scroll', this.scrollHandler);
                document.querySelector('.NavLink.home').click();
            }
        }

        window.scrollTo(0, 0);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    render() {
        return (
            <div className="ContactView view fadeIn" ref={this.elem}>
                <Title text="Contact" />
            </div>
        );
    }
}