import React, { useContext } from 'react';
import { StateContext } from '../../StateContext';

// shared
import Title from '../../Title/index';
import Follow from '../../Follow';
import SongCard, { songs } from '../../SongCard/index';
import UserMsg from '../../UserMsg';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import ViewTemplate, { Content, ContentContainer } from '../ViewTemplate';
import './index.scss';

const ListContainer = styled.div`
    width: 100%; 
    display: flex;
    justify-content: stretch;
    flex-wrap: wrap;
`;

const SongList = () =>
    songs.map((song, nth) =>
        <SongCard song={song} key={nth} num={nth} />
    );

const Loading = styled.p`
    display: ${props => props.displayNav
        ? 'block'
        : 'block'
    };
`;



const MusicView = props => {
    const { state } = useContext(StateContext);
    const { displayNav } = state;

    // always display loadingMsg before iframe load
    React.useEffect(() => {
        if (!displayNav) {
            document.querySelector('.loading').style.display = 'block';
        }
    }, [displayNav]);

    return (
        <>
            <ViewTemplate>
                <Title title='music' align='left' />
                <UserMsg msg='Loading...' msgClass='loading' containerClass='LoadingContainer' anim={true} />
                <Follow />
                <ListContainer>
                    <SongList />
                </ListContainer>
            </ViewTemplate>
        </>
    );
}

export default MusicView;