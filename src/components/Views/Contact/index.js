import React from 'react';
import ViewTemplate from '../ViewTemplate';

// children
import ContactForm from '../../ContactForm';

const ContactView = props => {
    return (
        <>
            <ViewTemplate>
                <ContactForm />
            </ViewTemplate>
        </>
    );
}

export default ContactView;