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

const ContactView = props => {
    return (
        <React.Fragment>
            <View className="ContactView view" title={props.name}>
                <ContactForm />
            </View>
        </React.Fragment>
    );
}

export default ContactView;