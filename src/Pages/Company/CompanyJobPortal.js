import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../Components/Navbar';
import CompanySideBar from '../../Components/CompanySideBar';
import AddJobCard from '../../Components/AddJobCard';
import UpdateJob from '../../Components/UpdateJob';
import Icon from '@mdi/react';
import { mdiMagnify, mdiPlus, mdiPencilOutline, mdiTrashCanOutline, mdiDotsVertical } from '@mdi/js';
import CompanyJobCard from '../../Components/CompanyJobCard';
import UserContext from '../../Context/User';
import { useHistory } from 'react-router';
import axios from 'axios';


function CompanyJobPortal() {
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [ShowEdit, setShowEdit] = useState(false);
    const [ShowJob, SetShowJob] = useState(false);
    const [job, setJobData] = useState()
    const [Jobs, setJobs] = useState([])
    const History = useHistory();

    useEffect(() => {
        if (user === '') {
            History.push('/user-login')
        }
        else {
            axios.get('https://iastestingapi.herokuapp.com/api/company/allJobs',
                {
                    headers: { 'x-access-token': user.token }
                }).then(async (res) => {
                    console.log(res.data)
                    setJobs(res.data)
                }).catch(async (err) => {
                    console.log(err)
                })
        }
    }, [user,History,show,ShowEdit,ShowJob]);

    const HandleDeletion = (jobID) => {
        axios.put('https://iastestingapi.herokuapp.com/api/company/archiveJob/' + jobID,
        {}, { headers: { 'x-access-token': user.token } })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <CompanySideBar />
            <NavBar />
            <div className='CompanyJobPortalContainer'>
                <div className='CompanyJobPortalHeaderContainer'>
                    <p className='CompanyJobPortalHeader'>Jobs</p>
                    <div className='CreateAndSearchContainer'>
                        <div className='CreateButton' onClick={() => setShow(true)} >
                            <Icon className='' path={mdiPlus} size={1} />
                            Add Jobs
                        </div>
                        <div className='CompanyJobPortalSearchBar'>
                            <input className='CompanyJobPortalSearchInput' type='text' placeholder='Search by title' />
                            <Icon className='CompanyJobPortalSearchIcon' path={mdiMagnify} size={1} />
                        </div>
                    </div>
                </div>
                <div className='CompanyJobPortalBodayContainer'>
                    <div className='JobTableHeaderRow'>
                        <div className='JobTableHeader'>Index</div>
                        <div className='JobTableHeader'>Title</div>
                        <div className='JobTableHeader'>Applicants</div>
                        <div className='JobTableHeader'>Date Posted</div>
                        <div className='JobTableHeader'>Status</div>
                        <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                    </div>

                    {
                        Jobs.map((data, index) =>
                            <div className='JobTableDataRow' key={index} onClick={()=>setJobData(data)}>
                                <div className='JobTableColumn'>{parseInt(index)+1}</div>
                                <div className='JobTableColumn Title' onClick={async() => {SetShowJob(true)}}>{data.title}</div>
                                <div className='JobTableColumn'>{data.applied.length}</div>
                                <div className='JobTableColumn' >{data.createdAt}</div>
                                <div className={`JobTableColumn  ${data.active?'Active':'Disable'}`}>{data.active ? "Active" : "Closed"}</div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <div className="Options" >
                                        <Icon className='' path={mdiDotsVertical} size={1} />
                                        <div class="DropDowncontent">
                                            <div onClick={() => setShowEdit(true)}>
                                                <Icon className='OptionsIcon' path={mdiPencilOutline} size={1} />
                                                <p>Edit</p>
                                            </div>
                                            <div onClick={()=>HandleDeletion(data._id)}>
                                                <Icon className='OptionsIcon' path={mdiTrashCanOutline} size={1} />
                                                <p>Close</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        )
                    }

                </div>
            </div>
            <AddJobCard show={show} Close={() => setShow(false)} user={user} />
            <UpdateJob show={ShowEdit} Close={() => setShowEdit(false)} job={job} user={user} />
            <CompanyJobCard show={ShowJob} onClose={() => SetShowJob(false)} job={job} user={user} />
        </div>
    );
}

export default CompanyJobPortal;