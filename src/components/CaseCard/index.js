import React, { Component } from 'react';

import styled from 'styled-components';

import { caseData } from './data';

const CaseCardContext = React.createContext();
class CaseProvider extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        caseData
    }

    render() {
        return (
            <CaseCardContext.Provider value={this.state}>
                {this.props.children}
            </CaseCardContext.Provider>
        )
    }
}

const CaseCardStyled = styled.a`
    display: flex;
    justify-content: space-evenly;
    margin: 20px auto;
    height: auto;
    min-height: 250px;
    border: solid black 2px;
    border-radius: 10px;
    padding: 20px;
    text-decoration: none;
`;

export default class CaseCards extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <CaseProvider>
                <CardList />
            </CaseProvider >
        );
    }
}

const CaseTitle = styled.h2`
    font-size: 1.2em;
    font-weight: 700;
    padding: 10px;
    color: black;
`;

const CaseContent = styled.div`
    font-size: 1.2em;
    color: white;
    width: 100%;
    background: hotpink url(${props => props.img});
    padding: 10px;
    border-radius: 10px;
    text-shadow: 2px 2px 5px black;
`;

const CardList = (props) => {
    const openExternal = (e, url) => {
        // dont go just yet
        e.preventDefault();

        // open new semi-functional broswer window
        let features = "menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes";
        let win = window.open(url, 'Kim Nkoubou\s work', features);

        // if fail, do "default"
        if (win) {
            win.focus();
        } else {
            window.location = url;
        }
    }

    return (
        <CaseCardContext.Consumer>
            {context =>
                context.caseData.map((item, nth) =>
                    <CaseCardStyled id={`case-${nth}`} className="CaseCard" key={`case-${nth}`} href={item.link} onClick={(e) => openExternal(e, item.link)}>
                        <CaseTitle>{item.title}</CaseTitle>
                        <CaseContent className="content" img={item.img}>
                            <p className="CaseContent">{item.content}</p>
                        </CaseContent>
                    </CaseCardStyled>)}
        </CaseCardContext.Consumer>
    );

}