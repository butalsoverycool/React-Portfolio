import React from 'react';

// shared
import Title from '../../Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import View, { Content, ContentContainer } from '../index';

const MusicView = props => {
    return (
        <React.Fragment>
            <View className="MusicView view" fadeIn title={props.name}>
                <ContentContainer className='content default'>
                    <Title title='music' align='left' />
                    <Content />
                </ContentContainer>
            </View>
        </React.Fragment>
    );
}

export default MusicView;