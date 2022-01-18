import React from "react"
import Icon from '@mdi/react';
import '../StyleSheets/web.css'
import { mdiChartBox, mdiHome, mdiBriefcase, mdiFaceAgent, mdiAccount, mdiCog, mdiLogout, mdiCreditCardOutline } from '@mdi/js';
export const ApplicantSideBarData = [
   
    
    {
        title: "Home",
        path: '/Jobs',
        icon: <Icon className='itemIcon' path={mdiHome} size={1} />
    },
    {
        title: "Interviews",
        path: '/ApplicantInterview',
        icon: <Icon className='itemIcon' path={mdiBriefcase} size={1} />
    },
    {
        title: "Profile",
        path: '/ApplicantProfile',
        icon: <Icon className='itemIcon' path={mdiAccount} size={1} />
    },
    {
        title: "Chat and Support",
        path: '/Chat',
        icon: <Icon className='itemIcon' path={mdiFaceAgent} size={1} />
    },
    {
        title: "Settings",
        path: '/CompanyDashboard',
        icon: <Icon className='itemIcon' path={mdiCog} size={1} />
    },
    {
        title: "Log out",
        path: '/user-login',
        icon: <Icon className='itemIcon' path={mdiLogout} size={1} />
    },
]