import React from 'react';

// shared
import Title from '../../Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import ViewTemplate, { ContentContainer } from '../ViewTemplate';

// children
import ContactForm from '../../ContactForm';

const ContactView = props => {

    return (
        <>
            <ViewTemplate className='Contact view'>
                <ContentContainer>
                    <Title title='music' align='left' />
                    <ContactForm />
                </ContentContainer>
            </ViewTemplate>
        </>
    );
}

export default ContactView;