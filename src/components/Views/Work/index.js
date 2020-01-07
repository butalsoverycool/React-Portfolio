// react
import React from 'react';

// shared
import Title from '../../Title/index';

// funcs
import * as FUNCS from '../../../logic/functions';

// style
import styled, { keyframes } from 'styled-components';
import View, { Content, ContentContainer } from '../index';

//children
import CaseCards from '../../CaseCard';

const WorkView = props => {
    return (
        <React.Fragment>
            <View className='WorkView view' fadeIn title={props.name}>
                <ContentContainer className='content default'>
                    <Title title='work' align='left' />
                    <CaseCards />
                </ContentContainer>

            </View>
        </React.Fragment>
    );
}

export default WorkView;
