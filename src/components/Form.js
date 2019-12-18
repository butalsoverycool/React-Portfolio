import React from 'react';

import styled from 'styled-components';

const Form = styled.form``;

const Fieldset = styled.fieldset`
    border: none;
    margin: 10px;
`;

const Label = styled.label`
    margin-right: 20px;
`;

const Input = styled.input`
    border: none;
    border-radius: 10px;
`;

const ContactForm = (props) => {
    return (
        <Form className="ContactForm">
            <Fieldset>
                <Label for="email">Email</Label>
                <Input type="text" id="email" />
            </Fieldset>
            <Fieldset>
                <Label for="msg">Message</Label>
                <Input type="text" id="msg" />
            </Fieldset>
        </Form>
    );
}

export default ContactForm;