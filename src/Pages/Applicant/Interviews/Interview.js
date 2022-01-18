import React, { useState } from 'react';
// import RecordVideo from './RecodedInterview';
// import QuestionInterview from './QuestionnaireInterview';
// import TaskInterview from './TaskInterview';
// import AlgorithmInterview from './AlgorithmInterview';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

export default function Interview(props) {
    const date = new Date(props.data.deadline * 1000);
    const startInterview = () => {
        props.onStart()
    }
    return (
        <div>
            <div className='body-content'>
                <div >
                    <Icon className='backIcon' path={mdiArrowLeft} size={1} onClick={props.onClose} />
                </div>
                <p className='UnderLineHeader'>Interviews</p>
                <div className='JobTableHeaderRow spacing'>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Interview title</div>
                    <div className='JobTableHeader'>Deadline</div>
                    <div className='JobTableHeader'>Attempt time</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>
                <div className='JobTableDataRow spacing'>
                    <div className='JobTableColumn'>1</div>
                    <div className='JobTableColumn Title'>{props.data?.testName}</div>
                    <div className='JobTableColumn'>{date.toLocaleDateString("en-US")}</div>
                    <div className='JobTableColumn'>{props.data.totalTime}</div>
                    <div className='JobTableColumn link' style={{ border: 'none' }} onClick={startInterview}><a>Start</a></div>
                </div>
            </div>
        </div>
    )
}