import React from 'react';

import styled from 'styled-components';

const Form = styled.form`
    background: #111;
    color: white;
    border-radius: 10px;

    width: 100%;
    max-width: 450px;
    font-size: 1.5em;

    

    
`;

const FormGroup = styled.div`
    width: 90%;
    border-radius: 10px;
    margin: 20px auto;
    padding: 20px 5px 0px;

    display: flex;
    
    justify-content: space-between;
`;

const Fieldset = styled.div`
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
`;

const Label = styled.label`
    margin: auto 20px auto 0;
`;

const Input = styled.input`
    font-size: 1em;
    padding: 5px;
    border: solid black 2px;
    border-radius: 10px;
    outline: none;
    color: black;

    flex-grow: 1;
    width: 50px;
`;

const Textarea = styled.textarea`
    font-size: 1.1em;
    padding: 5px;

    border-radius: 10px;
    outline: none;

    color: black;

    flex-grow: 1;
    width: 50px;
`;

const ContactForm = (props) => {
    const handleSubmit = () => {
        console.log('Submitted!');
    }

    return (
        <Form className="ContactForm" onSubmit={() => handleSubmit.bind(this)} method="POST">
            <FormGroup className="form-group">
                <Label htmlFor="name">name</Label>
                <Input type="text" className="form-control" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label htmlFor="exampleInputEmail1">email</Label>
                <Input type="email" className="form-control" aria-describedby="emailHelp" />
            </FormGroup>
            <FormGroup className="form-group">
                <Label htmlFor="message">message</Label>
                <Textarea className="form-control" rows="5"></Textarea>
            </FormGroup>
            <button type="submit" className="btn btn-primary">Submit</button>

            {/* <Fieldset>
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" />
            </Fieldset>
            <Fieldset>
                <Label htmlFor="msg">Message</Label>
                <Textarea type="text" id="msg" rows={5} />
            </Fieldset> */}
        </Form>
    );
}

export default ContactForm;