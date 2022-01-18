import React from 'react'
import AdminSideBar from '../../Components/AdminSideBar'
import NavBar from '../../Components/Navbar'
import Icon from '@mdi/react';
import { mdiTrashCan } from '@mdi/js';

export default function AdminDashboard() {
    return (
        <div>
            <AdminSideBar />
            <NavBar />
            <div className='body-content'>
                <div className='CountWrap'>
                    <div className='CompanyCountWrap'>
                        <p className='companyTitle'>Companies</p>
                        <p className='companyCount'>37</p>
                    </div>
                    <div className='CompanyCountWrap'>
                        <p className='companyTitle'>Applicants</p>
                        <p className='companyCount'>167</p>
                    </div>
                    <div className='CompanyCountWrap'>
                        <p className='companyTitle'>Jobs</p>
                        <p className='companyCount'>81</p>
                    </div>
                    <div className='CompanyCountWrap'>
                        <p className='companyTitle'>Complains</p>
                        <p className='companyCount'>2</p>
                    </div>
                </div>
                <div className='Container2'>
                    <div className='Container21'>
                        <div className='Container211'>
                            <p className='UnderLineHeader'>Companies</p>
                            <div className='JobTableHeaderRow spacing'>
                                <div className='JobTableHeader'>Index</div>
                                <div className='JobTableHeader'>Name</div>
                                <div className='JobTableHeader'>Joined At</div>
                                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Ecorp</div>
                                <div className='JobTableColumn'>10/01/21</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>2</div>
                                <div className='JobTableColumn Title' >System Limited</div>
                                <div className='JobTableColumn'>30/11/21</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                        </div>
                        <div className='Container211'>
                            <p className='UnderLineHeader'>Jobs</p>
                            <div className='JobTableHeaderRow spacing '>
                                <div className='JobTableHeader'>Index</div>
                                <div className='JobTableHeader'>Title</div>
                                <div className='JobTableHeader'>Status</div>
                                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Front-End Developer</div>
                                <div className='JobTableColumn Active'>Active</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>2</div>
                                <div className='JobTableColumn Title' >Back-End Developer</div>
                                <div className='JobTableColumn Disable'>Close</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>3</div>
                                <div className='JobTableColumn Title' >Full Stack Developer</div>
                                <div className='JobTableColumn Active'>Active</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                        </div>
                        <div className='Container211'>
                            <p className='UnderLineHeader'>Applicants</p>
                            <div className='JobTableHeaderRow spacing '>
                                <div className='JobTableHeader'>Index</div>
                                <div className='JobTableHeader'>Name</div>
                                <div className='JobTableHeader'>Jonied at</div>
                                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Suhaib Khawaja</div>
                                <div className='JobTableColumn'>1/2/21</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>2</div>
                                <div className='JobTableColumn Title' >Mudassir Ahmed</div>
                                <div className='JobTableColumn'>1/2/21</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Haseeb Ali SAjid</div>
                                <div className='JobTableColumn'>1/2/21</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='Container22'>
                        <div className='Container221'>
                            <p className='UnderLineHeader'>Complaines</p>
                            <div className='JobTableHeaderRow spacing '>
                                <div className='JobTableHeader'>Index</div>
                                <div className='JobTableHeader'>Title</div>
                                <div className='JobTableHeader'>Status</div>
                                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Payment Issues</div>
                                <div className='JobTableColumn Active'>Active</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>2</div>
                                <div className='JobTableColumn Title' >Interview Issue</div>
                                <div className='JobTableColumn Disable'>Close</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>3</div>
                                <div className='JobTableColumn Title' >Interview Issue</div>
                                <div className='JobTableColumn Disable'>Close</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>4</div>
                                <div className='JobTableColumn Title' >Interview Issue</div>
                                <div className='JobTableColumn Disable'>Close</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                        </div>
                        <div className='Container221'>
                            <p className='UnderLineHeader'>Subscriptions</p>
                            <div className='JobTableHeaderRow spacing'>
                                <div className='JobTableHeader'>Index</div>
                                <div className='JobTableHeader'>Title</div>
                                <div className='JobTableHeader'>Subscription</div>
                                <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>1</div>
                                <div className='JobTableColumn Title' >Ecorp</div>
                                <div className='JobTableColumn Active'>Active</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing'>
                                <div className='JobTableColumn'>2</div>
                                <div className='JobTableColumn Title' >Sysytems</div>
                                <div className='JobTableColumn Disable'>CLose</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <Icon className='Icon' path={mdiTrashCan} size={1} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}