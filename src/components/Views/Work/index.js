import React from 'react';
import ViewTemplate from '../ViewTemplate';
import CaseCards from '../../CaseCard';

const WorkView = props => {
    return (
        <React.Fragment>
            <ViewTemplate view='work'>
                <CaseCards />
            </ViewTemplate>
        </React.Fragment>
    );
}

export default WorkView;
