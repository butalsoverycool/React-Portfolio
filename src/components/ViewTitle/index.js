import React, { useContext } from 'react';
import styled from 'styled-components';
import { StateContext } from '../StateContext';

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
    margin: 70px 0;
`;

const TitleIntro = styled.video`
    width: 100%;
`;


const ViewTitle = (props) => {
    const { state } = useContext(StateContext);

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
            <TitleIntro
                src={src.intro}
                type='video/mp4'
                muted={true} autoPlay
                loop={false} playsInline={true}
                className={`${view}Intro TitleIntro`}
                onEnded={toggleProp}
                intro={fakeProp}
            />
        </TitleContainer>
    );
}

export default ViewTitle;