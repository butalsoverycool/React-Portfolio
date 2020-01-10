import React from 'react';

// shared
import Title from '../../Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import ViewTemplate, { Content, ContentContainer } from '../ViewTemplate';

const StoryView = props => {
    return (
        <>
            <ViewTemplate className='Story view'>
                <ContentContainer className='content default'>
                    <Title title='story' align='left' />
                    <Content />
                </ContentContainer>
            </ViewTemplate>
        </>
    )
}

export default StoryView;
