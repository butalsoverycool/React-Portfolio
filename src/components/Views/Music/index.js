import React from 'react';

// shared
import Title from '../../Title/index';
import SongCard, { songs } from '../../SongCard/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import ViewTemplate, { Content, ContentContainer } from '../ViewTemplate';

const SongListContainer = styled.div`
    width: 100%; 
    display: flex;
    justify-content: stretch;
    flex-wrap: wrap;
`;

const SongList = () =>
    songs.map((song, nth) =>
        <SongCard song={song} key={nth} />
    );

const MusicView = props => {

    return (
        <>
            <ViewTemplate className='Music view'>
                <ContentContainer className='content default'>
                    <Title title='music' align='left' />
                    <SongListContainer>
                        <SongList />
                    </SongListContainer>
                </ContentContainer>
            </ViewTemplate>
        </>
    );
}

export default MusicView;