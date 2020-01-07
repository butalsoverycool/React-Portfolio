// react
import React from 'react';
//import ReactDOMServer from 'react-dom/server';

// style
import styled from 'styled-components';

const IntroVideoStyled = styled.video`
    width: ${props => props.isPortrait ? 'auto' : '100vw'};
    height: ${props => props.isPortrait ? '100vh' : 'auto'};
    float: left;
    top: 0;
    padding: none;
    position: fixed;
    z-index: 0;
`;

export default class IntroVideo extends React.Component {
    /* constructor(props) {
        super(props);
    } */

    render() {
        return (
            <React.Fragment>
                <IntroVideoStyled
                    isPortrait={this.props.isPortrait}
                    className="video-container video-container-overlay"
                    autoPlay={true}
                    loop muted={this.props.muted || true}>
                    <source src={this.props.src} type="video/mp4" />
                </IntroVideoStyled>
            </React.Fragment>
        );
    }
}