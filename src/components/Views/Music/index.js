import React, { useContext } from 'react';
import { StateContext } from '../../StateContext';

// shared
import Follow from '../../Follow';
import SongCard, { songs } from '../../SongCard/index';
import UserMsg from '../../UserMsg';

// funcs

// style
import styled from 'styled-components';
import ViewTemplate from '../ViewTemplate';
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


const MusicView = props => {
    const { state } = useContext(StateContext);
    const { nav } = state;

    // always display loadingMsg before iframe load
    React.useEffect(() => {
        if (!nav.display) {
            document.querySelector('.loading').style.display = 'block';
        }
    }, [nav.display]);

    return (
        <>
            <ViewTemplate>
                {/* <Title title='music' align='left' /> */}
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