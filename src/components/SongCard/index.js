import React from 'react';
import styled from 'styled-components';
import responsive from '../../Responsive/index';

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
    props = props.song;

    console.log(props);

    const tagType = props.tag;

    //console.log(attrs);

    const Frame = styled(tagType)`
        width: ${props => props.with || '300px'};
        height: ${props => props.height || '380px'};
        margin: 0;
        flex-grow: 1;
        border: none;
        ${responsive('max-width').narrowSongCard`
            margin: 0;
            width: 100vw;
        `}
    `;

    return (
        <>
            <Frame
                className='SongCard'
                src={props.src}
                frameborder={props.attrs.frameborder}
                allowtransparency={props.attrs.allowtransparency}
                allow={props.attrs.allow}
            />
        </>
    );
}

export default SongCard;