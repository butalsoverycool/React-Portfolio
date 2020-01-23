import React, { Component, useContext } from 'react';
import { StateContext } from '../StateContext';

import styled from 'styled-components';
import responsive from '../../AtMedia';

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

    
    justify-content: stretch;
    flex-direction: column;
    
    margin: 20px auto;
    padding: 0px;
    text-decoration: none;

    font-size: 1.2em;
    color: white;
    width: 100%;
    min-height: 300px;
    background: hotpink url(${props => props.img});
    
    text-shadow: 2px 2px 5px black;
`;

const CaseTitle = styled.h2`
    font-size: 1.2em;
    font-weight: 700;
    padding: 20px;
    margin: 0;
    color: white;
`;

const CaseContent = styled.p`
    margin: 0;
    padding: 20px;
`;

const CardList = (props) => {
    const { state, dispatch } = useContext(StateContext);
    const { nav } = state;

    // linking to external page
    const openExternal = (e, url) => {
        // dont go just yet
        e.preventDefault();

        if (nav.display) return;

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
                    <CaseCardStyled id={`case-${nth}`} img={item.img} className="CaseCard" key={`case-${nth}`} href={item.link} onClick={(e) => openExternal(e, item.link)}>

                        {/* <ContentCard className="ContentCard" img={item.img}> */}
                        <CaseTitle className='CaseTitle'>{item.title}</CaseTitle>
                        <CaseContent className="CaseContent">{item.content}</CaseContent>
                        {/* </ContentCard> */}
                    </CaseCardStyled>)}
        </CaseCardContext.Consumer>
    );

}

const CaseCards = props => {
    return (
        <CaseProvider>
            <CardList />
        </CaseProvider >
    );
}

export default CaseCards;