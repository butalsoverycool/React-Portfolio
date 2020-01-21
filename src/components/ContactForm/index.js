import React, { Component, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';
import atMedia from '../../AtMedia';

import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as BRANDS from '@fortawesome/free-brands-svg-icons';
import * as REGULAR from '@fortawesome/fontawesome-free-solid';

const Form = styled.form`
    /* background: #111;
    color: white; */

    background: white;
    color: black;

    border-radius: 10px;

    width: 100%;
    max-width: 450px;
    font-size: 1.5em;   

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const FormGroup = styled.div`
    width: 100%;
    border-radius: 10px;
    margin: 20px 0;
`;


const Input = styled.input`
    width: 50%; 
    min-width: 120px;
    max-width: 100%;
    font-size: .8em;
    padding: 5px;
    border: solid black 1px;
    border-radius: 10px;
    outline: none;
    color: black;
`;

const Textarea = styled.textarea`
    width: 90%;
    max-width: 500px;
    font-size: .8em;
    padding: 5px;
    border: solid black 1px;
    border-radius: 10px;
    outline: none;
    color: black;
`;

const SubmitContainer = styled.div`
    width: 100%;
    height: 50px;
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

const contactData = [
    {
        network: 'mailto',
        url: 'mailto:kiiim@kiiim.se?&subject=I visited%20kiiim.se&body=Hello Kim...',
        icon: 'faPaperPlane',
        title: 'Send me an email'
    },
    {
        network: 'github',
        url: 'https://github.com/butalsoverycool/',
        icon: 'faGithub'
    },
    {
        network: 'linkedin',
        url: 'https://www.linkedin.com/in/kim-nkoubou-218012175/',
        icon: 'faLinkedin',
    },
    {
        network: 'facebook',
        url: 'https://www.facebook.com/kim.nkoubou/',
        icon: 'faFacebook',
    },
    {
        network: 'facebook',
        url: 'https://www.facebook.com/kimkoubou/',
        icon: 'faFacebook',
        title: 'facebook (artist)'
    },
    {
        network: 'instagram',
        url: 'https://www.instagram.com/kimkoubou/',
        icon: 'faInstagram'
    }
];

const Container = styled.div`
    max-width: 100%;
    display: flex;
    justify-content: stretch;
    flex-wrap: wrap;
`;

const Card = styled.a`
    padding: 10px;
    text-align: left;
    width: 300px;
    max-width: 340px;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    background: ${props => props.bg};
    text-decoration: none;
    color: black;


    ${atMedia([{ key: 'max-width', val: '673px' }])`
        margin: 0;
        width: 100vw;
        max-width: 100vw;
        justify-content: space-between;
        margin-bottom: 15px;
    `}

    &:hover > svg{
        opacity: 1;
    }
`;

const ContactLinkTitle = styled.p`
    height: 100%;
    line-height: 100px;
    margin: 0;

    ${atMedia([{ key: 'max-width', val: '673px' }])`
        margin: 0;
    `}
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 100px;
    margin-right: 30px;
    opacity: .6;
    transition: .5s;
    
`;


const ContactLinks = props => {

    return (
        // create contact-cards from data
        props.data.map((item, nth) => {

            // color-differ, range of 3
            const cardBg = (nth === 0 || nth % 3 === 0
                ? '#f7f7f7'
                : (nth === 1 || nth % 4 === 0
                    ? '#f0f0f0' : '#e6e6e6'
                ));

            return (
                <Card
                    key={nth}
                    href={item.url}
                    className={`ContactLinkCard-${item.title || item.network} 
                ContactLinkCard`}
                    bg={cardBg}
                >
                    <ContactLinkTitle>{item.title || item.network}</ContactLinkTitle>
                    <Icon icon={BRANDS[item.icon] || REGULAR[item.icon]} className={`ContactLink-${item.network} ContactLink`} />
                </Card>
            )
        })
    );
}

const ContactForm = (props) => {
    const handleSubmit = () => {
        console.log('Submitted!');
    }

    const submitHandler = e => {
        e.preventDefault();
    }


    /* let icons = document.querySelectorAll('a.social-icon');

    for (let nth = 0; nth < icons.length; ++nth) {
        let div = document.createElement('div');

        div.className = icons[nth].className;
        div.setAttribute('aria-label', icons[nth].getAttribute('aria-label'));
        div.setAttribute('style', icons[nth].getAttribute('style'));
        div.innerHTML = icons[nth].innerHTML;

        icons[nth].parentNode.replaceChild(div, icons[nth]);
    } */







    return (
        <>
            <Container className={`ContactLinkContainer`}>
                <ContactLinks data={contactData} />
            </Container>
        </>
    );
}

export default ContactForm;