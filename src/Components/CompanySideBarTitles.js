import React from "react"
import Icon from '@mdi/react';
import '../StyleSheets/web.css'
import { mdiChartBox, mdiLaptop , mdiBriefcase, mdiFaceAgent, mdiAccount, mdiCog, mdiLogout,mdiCreditCardOutline } from '@mdi/js';
export const CompanySideBarData=[
    {
        title:"Dashboard",
        path:'/CompanyDashboard',
        icon:<Icon className='itemIcon' path={mdiChartBox} size={1}/>
    },
    {
        title:"Jobs",
        path:'/JobPortal',
        icon:<Icon className='itemIcon' path={mdiBriefcase} size={1}/>
    },
    {
        title:"Interviews",
        path:'/CompanyInterview',
        icon:<Icon className='itemIcon' path={mdiLaptop} size={1}/>
    },
    {
        title:"Subscription",
        path:'/PaymentAndSubscription',
        icon:<Icon className='itemIcon' path={mdiCreditCardOutline} size={1}/>
    },
    {
        title:"Chat and Support",
        path:'/Chat',
        icon:<Icon className='itemIcon' path={mdiFaceAgent} size={1}/>
    },
    {
        title:"Profile",
        path:'/CompanyProfile',
        icon:<Icon className='itemIcon' path={mdiAccount} size={1}/>
    },
    {
        title:"Settings",
        path:'/CompanyDashboard',
        icon:<Icon className='itemIcon' path={mdiCog} size={1}/>
    },
    {
        title:"Log out",
        path:'/user-login',
        icon:<Icon className='itemIcon' path={mdiLogout} size={1}/>
    },
]