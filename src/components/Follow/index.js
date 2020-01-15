import React, { useContext } from 'react';
import { StateContext } from '../StateContext';
import styled from 'styled-components';

const artist = {
    tag: 'iframe',
    src: 'https://open.spotify.com/follow/1/?uri=spotify:artist:2OvDFvv8UQlLBQyzjGRhwo?si=fssa7iwbTe-9PLJBjhJP-Q&size=detail&theme=light',
    attrs: {
        frameborder: '0',
        allowtransparency: 'true',
        allow: 'encrypted-media',
        width: '300',
        height: '56',
        scrolling: 'no',
    },
    style: {
        width: '300',
        height: '56',
        border: 'none',
        overflow: 'hidden'
    },
    meta: {
        artist: 'Kim Nkoubou',
        player: 'Spotify'
    }
}





/* const FollowBtn = props => {
    props = props.artist;
    

    


    return (
        <Btn
        /* src={src}
        frameBorder={frameBorder}
        allowtransparency={allowtransparency}
        allow={allow}
        width={width}
        height={height}
        scrolling={scrolling}
        overflow={overflow} 
        />
    );
}

const ArtistList = artists.map((artist, nth) =>
    <>
        <FollowBtn
            key={nth}
            artist={artist}
        />
    </>
); */

const FollowContainer = styled.div`
    width: 100%;
    text-align: left;
    margin: 10px 0;
`;



const Follow = () => {
    const { state } = useContext(StateContext);
    const { displayNav } = state;

    const { tag, src, style } = artist;
    const { frameBorder, allowtransparency, allow, width, height, scrolling, overflow } = artist.attrs;

    const FollowBtn = styled(tag)`
        width: ${props => props.width};
        height: ${props => props.height};
        opacity: 0;
    `;

    // smoothing spotify's ugly iframe render glitch
    const loadHandler = (e) => {
        if (!displayNav) {
            e.target.classList.add('appear');
        }
    }

    return (
        <FollowContainer
            className='FollowContainer'
        >
            <FollowBtn
                className='Follow'
                src={src}
                style={style}
                frameBorder={frameBorder}
                allowtransparency={allowtransparency}
                allow={allow}
                width={width}
                height={height}
                scrolling={scrolling}
                onLoad={loadHandler}
            />
        </FollowContainer>
    );
}



export default Follow;