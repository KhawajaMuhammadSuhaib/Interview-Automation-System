import React from 'react';
import '../StyleSheets/web.css'
import { ApplicantSideBarData } from './ApplicantSideBarTitles';
import { NavLink } from 'react-router-dom';

function ApplicantSideBar(props) {

    return (
        <div className='sidebarContainer'>
            <div className='sidebar'>
                {
                    ApplicantSideBarData.map((data, index) =>
                        <div className='itemWrap' key={index}>
                            <NavLink to={data.path} activeClassName='onClick' className='item'>
                                {data.icon}
                                <p className='itemTitle'>{data.title}</p>
                            </NavLink>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default ApplicantSideBar;