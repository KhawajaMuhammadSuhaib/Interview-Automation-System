import React, { useState } from 'react';
import { JobsData } from '../Components/Jobs';
import { MyJobs } from './MyJobs';
import { SavedData } from '../Components/SavedJobs';
import Icon from '@mdi/react';
import { mdiBookmarkOutline } from '@mdi/js';


function AvailableJobs(props) {
    const[save,setSave]=useState(false)
    const job = (
        JobsData.map((data, index) =>
            <div className='JobWrap' key={index} >
                <div className='JobPicWrap' onClick={props.onClick}>
                    {data.Pic}
                </div>
                <div className='JobInfoWrap'>
                    <div className='InfoAndIconContainer'>
                        <p className='JobPosition'
                            onClick={() => {
                                props.parentCallBack(data)
                                props.onClick()
                                if (MyJobs !== []) {
                                    MyJobs.map((item, index) => {
                                        if (data.title === item.title) {
                                            props.Apply(true);
                                        }
                                    })
                                }
                            }}>{data.title}
                        </p>
                        <div className="JobSaveButtonWrap">
                            <Icon className='JobSaveButton' path={mdiBookmarkOutline} size={1}
                                onClick={() => {
                                    SavedData.push(data);
                                }}
                            />

                        </div>
                    </div>
                    <p className='JobCompany'>{data.Company}</p>
                    <p className='JobLocation'>{data.Location}</p>
                    <p className='PublishTime'>{data.Time}</p>
                </div>
            </div>
        )
    );
    return (
        <div>{job}</div>
    )
}

export default AvailableJobs;