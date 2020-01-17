import React, { useContext } from 'react';
import { StateContext } from '../../StateContext'
import styled, { css } from 'styled-components';
import atMedia from '../../../AtMedia';
import NavToggle from '../../NavToggle';

const txt = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
    incididunt ut labore et dolore magna aliqua. Sem integer vitae justo eget magna 
    fermentum iaculis eu. Tellus orci ac auctor augue mauris augue neque gravida. 
    Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. 
    Cras sed felis eget velit aliquet sagittis id. Id faucibus nisl tincidunt eget nullam.`,

    `Dictum at tempor commodo ullamcorper a lacus. In dictum non consectetur a erat nam. 
    At tempor commodo ullamcorper a. Augue eget arcu dictum varius duis at consectetur lorem donec. 
    Non quam lacus suspendisse faucibus interdum posuere lorem. Etiam tempor orci eu lobortis 
    elementum.Pellentesque habitant morbi tristique senectus et netus et malesuada.Urna nec tincidunt 
    praesent semper feugiat nibh sed pulvinar proin.Ac orci phasellus egestas tellus rutrum tellus 
    pellentesque eu.Sed lectus vestibulum mattis ullamcorper velit sed.Fermentum et sollicitudin ac 
    orci.Convallis aenean et tortor at risus viverra adipiscing.Vel elit scelerisque mauris pellentesque 
    pulvinar pellentesque habitant morbi.Aenean vel elit scelerisque mauris pellentesque.Vestibulum 
    rhoncus est pellentesque elit ullamcorper dignissim cras.Justo laoreet sit amet cursus sit amet.Massa 
    tempor nec feugiat nisl pretium fusce.Tincidunt augue interdum velit euismod in pellentesque.`,

    `Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur.Ac odio tempor orci 
    dapibus ultrices.Sit amet consectetur adipiscing elit ut aliquam purus.Facilisis mauris sit 
    amet massa vitae tortor condimentum.Morbi enim nunc faucibus a.Aliquam sem et tortor consequat 
    id porta nibh.Quam viverra orci sagittis eu volutpat. Aliquam nulla facilisi cras fermentum.Volutpat 
    lacus laoreet non curabitur gravida arcu ac tortor dignissim.Risus commodo viverra maecenas accumsan 
    lacus vel.Id donec ultrices tincidunt arcu non sodales.Euismod lacinia at quis risus sed 
    vulputate odio.Massa vitae tortor condimentum lacinia quis vel.Facilisis gravida neque convallis 
    a cras semper auctor neque.Cursus sit amet dictum sit amet.Orci ac auctor augue mauris 
    augue neque gravida in.Ac orci phasellus egestas tellus rutrum tellus pellentesque eu.`,

    `Pellentesque elit eget gravida cum.In fermentum et sollicitudin ac orci phasellus 
    egestas tellus.Nunc aliquet bibendum enim facilisis gravida neque convallis a cras.Sit 
    amet massa vitae tortor condimentum lacinia quis vel.Turpis egestas sed tempus urna.Risus 
    viverra adipiscing at in tellus.Vulputate eu scelerisque felis imperdiet proin fermentum 
    leo.Ac feugiat sed lectus vestibulum mattis.Eu facilisis sed odio morbi quis commodo 
    odio aenean sed.Sed pulvinar proin gravida hendrerit lectus.Sodales ut etiam sit amet 
    nisl purus.Gravida in fermentum et sollicitudin ac orci phasellus egestas.Tellus at urn
    a condimentum mattis pellentesque id nibh tortor id.Malesuada nunc vel risus commodo vi
    verra maecenas.Ipsum dolor sit amet consectetur adipiscing.Commodo elit at imperdiet du
    i accumsan sit.Vulputate sapien nec sagittis aliquam malesuada bibendum.Facilisis gravid
    a neque convallis a cras semper auctor neque. Aliquam ultrices sagittis orci a scelerisqu
    e purus semper.Sed egestas egestas fringilla phasellus.Nec feugiat nisl pretium fusce id.`,

    `At consectetur lorem donec massa sapien faucibus et.Enim nec dui nunc mattis enim ut.Qua
    m vulputate dignissim suspendisse in est ante in nibh mauris.Nascetur ridiculus mus mau
    ris vitae ultricies leo.Magna fringilla urna porttitor rhoncus dolor purus non enim.At 
    risus viverra adipiscing at in.Ante metus dictum at tempor commodo ullamcorper a lacus 
    vestibulum.Leo duis ut diam quam nulla porttitor.Vestibulum lorem sed risus ultricies 
    tristique.Rhoncus dolor purus non enim.`
];

const Paragraph = styled.p`
    font-size: 1em;
    text-align: left;
    line-height: 2em;
    padding: 10px 0px;
`;

export const Lorem = props => {
    return props.printLorem
        ? (
            txt.map((part, nth) => <Paragraph key={nth}>{part}</Paragraph>)
        )
        : null;
}

export const ContentContainer = styled.div`
    width: 95%;
    max-width: 650px;
    padding: 10px;
    height: auto;
    margin: auto;
    margin-bottom: 200px;
    ${atMedia([{ key: 'max-width', val: '420px' }])`
        width: 90%;
        padding: 0;
    `}
`;

// export to apply on all views
const Template = styled.main`
    width: 100vw;
    position: absolute;
    left: 0;
    top: ${props => props.displayNav && props.activeView !== 'music' ? '-50px' : '0'};
    filter: ${props => props.displayNav ? 'blur(5px)' : 'none'};
    transition: .4s;
`;

const ViewTemplate = props => {
    const { printLorem, children } = props;

    const { state, dispatch } = useContext(StateContext);
    const { activeView, displayNav } = state;

    const capitalize = (word) => {
        if (typeof word !== 'string') return ''
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const view = capitalize(activeView);

    return (
        <>
            <Template className={`${view}View view`} activeView={activeView} displayNav={displayNav}>
                <ContentContainer className='ContentContainer'>
                    {children}
                    <Lorem printLorem={printLorem} />
                </ContentContainer>
            </Template>
            <NavToggle />
        </>
    );
}

export default ViewTemplate;