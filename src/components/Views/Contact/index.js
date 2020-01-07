import React from 'react';

// shared
import Title from '../../Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import View, { Content, ContentContainer } from '../index';

// children
import ContactForm from '../../ContactForm';

//export default class ContactView extends Component {
/* constructor(props) {
    super(props);

    this.elem = React.createRef();

    this.scrollHandler = this.scrollHandler.bind(this);
} */

/* scrollHandler() {
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

componentDidMount() {
    document.addEventListener('scroll', this.scrollHandler);
}

componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler);
} */

//render() {
const ContactView = props => {
    return (
        <React.Fragment>
            <View className="ContactView view" title={props.name}>
                <ContactForm />
            </View>
        </React.Fragment>
    );
    //}
}

export default ContactView;