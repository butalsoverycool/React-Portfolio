import React from 'react';
import Title from '../../Title';
import ViewTemplate, { Content, ContentContainer } from '../ViewTemplate';
import CaseCards from '../../CaseCard';

const WorkView = props => {
    return (
        <React.Fragment>
            <ViewTemplate className='Work view'>
                <ContentContainer className='content default'>
                    <Title title='work' align='left' />
                    <CaseCards />
                </ContentContainer>
            </ViewTemplate>
        </React.Fragment>
    );
}

export default WorkView;
