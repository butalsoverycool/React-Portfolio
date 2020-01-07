import React from 'react';

// shared
import Title from '../../Title/index';
import SongCard, { songs } from '../../SongCard/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import View, { Content, ContentContainer } from '../index';

const FlexContainer = styled.div`
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
        <React.Fragment>
            <View className="MusicView view" fadeIn title={props.name}>
                <ContentContainer className='content default'>
                    <Title title='music' align='left' />
                    <FlexContainer>
                        <SongList />
                    </FlexContainer>
                </ContentContainer>
            </View>
        </React.Fragment>
    );
}

export default MusicView;