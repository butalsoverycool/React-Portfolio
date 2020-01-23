import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import atMedia from '../../AtMedia';
import { StateContext } from '../StateContext';

export const songs = [
    {
        tag: 'iframe',
        src: 'https://open.spotify.com/embed/track/0hxWdd5nIBwxgBe6lSgoZL',
        attrs: {
            frameborder: '0',
            allowtransparency: 'true',
            allow: 'encrypted-media'
        },
        meta: {
            title: 'Ge Upp',
            artist: 'Kim Nkoubou',
            player: 'Spotify'
        }
    },
    {
        tag: 'iframe',
        src: 'https://open.spotify.com/embed/track/4kKCRl5mSqZ19jmGw70CfX',
        attrs: {
            frameborder: '0',
            allowtransparency: 'true',
            allow: 'encrypted-media'
        },
        meta: {
            title: 'Nära Ögat',
            artist: 'Kim Nkoubou',
            player: 'Spotify'
        }
    },
    {
        tag: 'iframe',
        src: 'https://open.spotify.com/embed/track/7DIrFnVD4teYhGVDQKDbeN',
        attrs: {
            frameborder: '0',
            allowtransparency: 'true',
            allow: 'encrypted-media'
        },
        meta: {
            title: 'Puss och Kram Motherfucker',
            artist: 'Kim Nkoubou',
            player: 'Spotify'
        }
    }
];


const SongCard = props => {
    // state
    const { state } = useContext(StateContext);
    const { nav } = state;

    // props
    const key = props.num;
    props = props.song;
    const tagType = props.tag;

    const Frame = styled(tagType)`
        width: ${props => props.with || '300px'};
        height: 0;
        margin: 0;
        flex-grow: 1;
        border: none;
        opacity: 0;

        ${atMedia([{ key: 'max-width', val: '320px' }])`
            margin: 0;
            width: 100vw;
        `}
    `;

    // smoothing spotify's ugly iframe render glitch
    const loadHandler = (e) => {
        if (!nav.display) {
            e.target.classList.add('appear');
        }
        document.querySelector('.loading').style.display = 'none';
    }

    return (
        <>
            <Frame
                className={`SongCard ${props.meta.title}`}
                data-key={key}
                src={props.src}
                frameborder={props.attrs.frameborder}
                allowtransparency={props.attrs.allowtransparency}
                allow={props.attrs.allow}
                onLoad={loadHandler}
            />
        </>
    );
}

export default SongCard;