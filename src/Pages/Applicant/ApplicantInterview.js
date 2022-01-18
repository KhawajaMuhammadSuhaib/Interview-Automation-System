import React from 'react';
import ApplicantSideBar from '../../Components/ApplicantSideBar';
import NavBar from '../../Components/Navbar';

export default function ApplicantInterview() {
    return (
        <div>
            <ApplicantSideBar />
            <NavBar />
            <div className='body-content'>
                <p className='UnderLineHeader'>Interviews</p>
                <div className='JobTableHeaderRow '>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Job Title</div>
                    <div className='JobTableHeader'>Company</div>
                    <div className='JobTableHeader'>Status</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>
                <div className='JobTableDataRow spacing '>
                    <div className='JobTableColumn'>1</div>
                    <div className='JobTableColumn Title'>Front-End Developer</div>
                    <div className='JobTableColumn'>Systems Limited</div>
                    <div className='JobTableColumn'>Pending</div>
                    <div className='JobTableColumn link' style={{ border: 'none' }}><a>Start</a></div>
                </div>
                <div className='JobTableDataRow spacing '>
                    <div className='JobTableColumn'>2</div>
                    <div className='JobTableColumn Title'>WordPress Developer</div>
                    <div className='JobTableColumn'>Ecorp Limited</div>
                    <div className='JobTableColumn'>Pending</div>
                    <div className='JobTableColumn link' style={{ border: 'none' }}><a>Start</a></div>
                </div>
                <div className='JobTableDataRow spacing '>
                    <div className='JobTableColumn'>3</div>
                    <div className='JobTableColumn Title'>React Developer</div>
                    <div className='JobTableColumn'>GS Limited</div>
                    <div className='JobTableColumn'>Pending</div>
                    <div className='JobTableColumn link' style={{ border: 'none' }}><a>Start</a></div>
                </div>
            </div>
        </div>
    )
}