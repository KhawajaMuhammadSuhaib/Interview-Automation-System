import React from 'react'
import Icon from '@mdi/react';
import { mdiMagnify, mdiPlus, mdiPencilOutline, mdiTrashCanOutline, mdiDotsVertical } from '@mdi/js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function InterviewCard() {
    const percentage = 66;
    return (
        <div>
            <p className='UnderLineHeader'>Interview for Front-End Developer</p>
            <div className='mainWrap'>
                <div className='leftWrap'>
                    <div className='interviewStartWrap'>
                        <p className='interviewHeader'>Questionnaire Interview</p>
                        <div className='ApplyButton'>Start</div>
                    </div>
                    <div className='interviewStartWrap'>
                        <p className='interviewHeader'>Coding Interview</p>
                        <div className='ApplyButton'>Start</div>
                    </div>
                    <div className='interviewStartWrap'>
                        <p className='interviewHeader'>Recorded Interview</p>
                        <div className='ApplyButton'>Start</div>
                    </div>
                </div>
                <div className='rightWrap'>
                    <p className='interviewHeader2'>Interview Completed</p>
                    <div className='progress'>
                        <CircularProgressbar className='bar' styles={buildStyles({ pathColor: '#af0000', textColor: '#af0000' })} value={percentage} text={`${percentage}%`} />;
                    </div>
                </div>
            </div>
            <p className='UnderLineHeader'>Reports & Result</p>
            <div className='JobTableHeaderRow '>
                <div className='JobTableHeader'>Index</div>
                <div className='JobTableHeader'>Title</div>
                <div className='JobTableHeader'>Score</div>
                <div className='JobTableHeader'>Time Takken</div>
                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
            </div>
            <div className='JobTableDataRow'>
                <div className='JobTableColumn'>1</div>
                <div className='JobTableColumn Title' >Suhaib Khawaja</div>
                <div className='JobTableColumn'>30</div>
                <div className='JobTableColumn' >12 minutes</div>
                <div className='JobTableColumn ' style={{ border: 'none' }}>
                    <div className="Options" >
                        <Icon className='' path={mdiDotsVertical} size={1} />
                        <div class="DropDowncontent">
                            <div>
                                <Icon className='OptionsIcon' path={mdiPencilOutline} size={1} />
                                <p>Select</p>
                            </div>
                            <div >
                                <Icon className='OptionsIcon' path={mdiTrashCanOutline} size={1} />
                                <p>Reject</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}