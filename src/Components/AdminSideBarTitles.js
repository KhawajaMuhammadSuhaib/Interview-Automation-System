import React from "react"
import Icon from '@mdi/react';
import '../StyleSheets/web.css'
import { mdiChartBox, mdiLogout } from '@mdi/js';
export const AdminSideBarData=[
    {
        title:"Dashboard",
        path:'/AdminDashboard',
        icon:<Icon className='itemIcon' path={mdiChartBox} size={1}/>
    },
    {
        title:"Log out",
        path:'/Logout',
        icon:<Icon className='itemIcon' path={mdiLogout} size={1}/>
    },
]