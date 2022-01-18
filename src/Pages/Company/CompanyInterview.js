import React, { useState } from 'react'
import CompanySideBar from '../../Components/CompanySideBar'
import NavBar from '../../Components/Navbar'
import InterviewSettings from '../../Components/InterviewFlowSetting'
import Icon from '@mdi/react';
import InterviewCard from '../../Components/InterviewCard'
import { mdiArrowLeft } from '@mdi/js';


export default function CompanyInterview() {
    const [ShowSetting, SetShowSetting] = useState(false);
    const [ShowReport, SetShowReport] = useState(false);
    const [ShowInterview, SetShowInterview] = useState(true);
    const HandleShowReport = () => {
        SetShowReport(true)
        SetShowSetting(false)
        SetShowInterview(false)
    }
    const HandleShowInterview = () => {
        SetShowReport(false)
        SetShowSetting(false)
        SetShowInterview(true)
    }
    const HandleShowSettings = () => {
        SetShowReport(false)
        SetShowSetting(true)
        SetShowInterview(false)
    }
    return (
        <div>
            <CompanySideBar />
            <NavBar />
            <div className={`body-content ${ShowInterview ? '' : 'hide'}`}>
                <p className='UnderLineHeader'>Interviews</p>
                <div className='JobTableHeaderRow '>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Job Title</div>
                    <div className='JobTableHeader'>Applicants</div>
                    <div className='JobTableHeader'>Completed Interview</div>
                    <div className='JobTableHeader'>Pending Interview</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>
                <div className='JobTableDataRow spacing '>
                    <div className='JobTableColumn'>1</div>
                    <div className='JobTableColumn Title' onClick={HandleShowReport}>Front-End Developer</div>
                    <div className='JobTableColumn'>20</div>
                    <div className='JobTableColumn'>10</div>
                    <div className='JobTableColumn'>10</div>
                    <div className='JobTableColumn link' style={{ border: 'none' }} onClick={HandleShowSettings}><a>Settings</a></div>
                </div>
            </div>
            <div className={`body-content ${ShowSetting ? '' : 'hide'}`}>
                <div onClick={HandleShowInterview}><Icon path={mdiArrowLeft } size={1}/></div>
                <InterviewSettings />
                <div className='flowButton'>
                    <div className='ApplyButton' onClick={HandleShowInterview}>Save</div>
                </div>
            </div>
            <div className={`body-content ${ShowReport ? '' : 'hide'}`}>
                <div onClick={HandleShowInterview}> <Icon path={mdiArrowLeft } size={1}/></div>
                <InterviewCard />
            </div>
        </div>
    )
}