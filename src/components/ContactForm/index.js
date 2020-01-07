import React from 'react';

import styled from 'styled-components';

const Form = styled.form`
    width: 100%;
    max-width: 450px;
    margin: auto;
    font-size: 1.5em;
`;

const Fieldset = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
`;

const Label = styled.label`
    margin-right: 20px;
`;

const Input = styled.input`
    font-size: 1.1em;
    padding: 5px;
    border: solid black 2px;
    border-radius: 10px;
    outline: none;
`;

const Textarea = styled.textarea`
    font-size: 1.1em;
    padding: 5px;
    border: solid black 2px;
    border-radius: 10px;
    outline: none;
`;

const ContactForm = (props) => {

    return (
        <Form className="ContactForm">
            <Fieldset>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" />
            </Fieldset>
            <Fieldset>
                <Label htmlFor="msg">Message</Label>
                <Textarea type="text" id="msg" rows={5} />
            </Fieldset>
        </Form>
    );
}

export default ContactForm;