import React from 'react';

import styled from 'styled-components';

const Form = styled.form`
    /* background: #111;
    color: white; */

    background: white;
    color: black;

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
    border: solid black 1px;
    border-radius: 10px;
    outline: none;
    color: black;

    flex-grow: 1;
    width: 50px;
`;

const Textarea = styled.textarea`
    font-size: .8em;
    padding: 5px;

    border: solid black 1px;
    border-radius: 10px;
    outline: none;

    color: black;

    flex-grow: 1;
    width: 50px;
`;

const SubmitContainer = styled.div`
    width: 100%;
    height 50px;
    text-align: center;
    padding: 50px 0;
`;

const Submit = styled.button`
    outline: none;
    cursor: pointer;

    width: 200px;
    height: 70px;
    margin: auto;
    font-size: 1.5em;
    border-radius: 10px;

    background: #111;
    color: whitesmoke;

`;

const ContactForm = (props) => {
    const handleSubmit = () => {
        console.log('Submitted!');
    }

    const submitHandler = e => {
        e.preventDefault();
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
                <Textarea className="form-control" rows="8"></Textarea>
            </FormGroup>
            <SubmitContainer>
                <Submit type="submit" className="btn btn-primary" onClick={submitHandler}>Send</Submit>
            </SubmitContainer>
        </Form>
    );
}

export default ContactForm;