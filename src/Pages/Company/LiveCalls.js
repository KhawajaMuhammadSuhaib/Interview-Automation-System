import React, { useState } from 'react';
import CompanySideBar from '../../Components/CompanySideBar';
import NavBar from '../../Components/Navbar';
import AllInterview from './Interviews/AllInterviews';

export default function LiveCalls() {
    const [ShowSetting, SetShowSetting] = useState(false);
    const [ShowInterview, SetShowInterview] = useState(true);
    const HandleShowInterview = () => {
        SetShowSetting(false)
        SetShowInterview(true)
    }
    const HandleShowSettings = () => {
        SetShowSetting(true)
        SetShowInterview(false)
    }
    return (
        <div>
            <CompanySideBar />
            <NavBar />
            <div className={`body-content ${ShowInterview ? '' : 'hide'}`}>
                <p className='UnderLineHeader'>Call Requests</p>
                <div className='JobTableHeaderRow '>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Name</div>
                    <div className='JobTableHeader'>Email</div>
                    <div className='JobTableHeader'>Accept</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Reject</div>
                </div>
                <div className='JobTableDataRow spacing '>
                    <div className='JobTableColumn'>1</div>
                    <div className='JobTableColumn Title' >Suhaib Khawaja</div>
                    <div className='JobTableColumn'>suhaib200@gmail.com</div>
                    <div className='JobTableColumn'><a>Accept</a></div>
                    <div className='JobTableColumn link' style={{ border: 'none' }} onClick={HandleShowSettings}><a>Reject</a></div>
                </div>
            </div>
            <div className={`body-content ${ShowSetting ? '' : 'hide'}`}>
                {/* <AllInterview onClose={HandleShowInterview} /> */}
            </div>
        </div>
    )
}