import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../StateContext';
//import { CSSTransition } from 'react-transition-group';
//import './index.scss';

// endframes
import musicEndframe from '../../media/musicEndframe.png';
import storyEndframe from '../../media/storyEndframe.png';
import workEndframe from '../../media/workEndframe.png';
import contactEndframe from '../../media/contactEndframe.png';

//intros
import musicIntro from '../../media/musicIntro.mp4';
import storyIntro from '../../media/storyIntro.mp4';
import workIntro from '../../media/workIntro.mp4';
import contactIntro from '../../media/contactIntro.mp4';

const TitleContainer = styled.div`
    width: 180px;
    height: 100px;
    position: relative;
`;

/* const TitleStyled = styled.img`
    width: 100%;
    position: absolute;
    z-index: ${props => props.intro ? '-1' : '1'};
`; */

const Video = styled.video`
    width: 100%;
`;


const ViewTitle = (props) => {
    const { state, dispatch } = useContext(StateContext);

    const { activeView } = state;

    const { view } = props;

    const src = (() => {
        switch (activeView) {
            case 'music':
                return {
                    intro: musicIntro,
                    endframe: musicEndframe
                }
            case 'story':
                return {
                    intro: storyIntro,
                    endframe: storyEndframe
                }
            case 'work':
                return {
                    intro: workIntro,
                    endframe: workEndframe
                }
            case 'contact':
                return {
                    intro: contactIntro,
                    endframe: contactEndframe
                }
        }
    })();



    let fakeProp = true;

    const toggleProp = () => {
        fakeProp = false;
    }




    return (
        <TitleContainer>
            <Video
                src={src.intro}
                type='video/mp4'
                muted={true} autoPlay
                loop={false} playsInline={true}
                className={`${view}Intro TitleIntro`}
                onEnded={toggleProp}
                intro={fakeProp}
            />
            {/* <TitleStyled src={src.endframe} className={`${view}Title Title`} intro={fakeProp} /> */}
        </TitleContainer>
    );
}

export default ViewTitle;