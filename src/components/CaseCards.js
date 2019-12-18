import React, { Component } from 'react';

import styled from 'styled-components';

import { caseData } from './CaseData';

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
    width: 90%;
    height: auto;
    background: black;
    border-radius: 10px;
    padding: 20px;
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

const CaseContent = styled.div`
    color: white;
    width: 90%;
    background: hotpink url(${props => props.img});
    margin: 10px;
`;

const CardList = (props) =>
    <CaseCardContext.Consumer>
        {context =>
            context.caseData.map((item, nth) =>
                <CaseCardStyled id={`case-${nth}`} key={`case-${nth}`} href={item.link}>
                    <h2>{item.title}</h2>
                    <CaseContent className="content" img={item.img}>
                        <p className="CaseContent">{item.content}</p>
                    </CaseContent>
                </CaseCardStyled>)}
    </CaseCardContext.Consumer>