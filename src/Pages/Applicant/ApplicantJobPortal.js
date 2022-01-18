import React, { useEffect, useState,useContext } from 'react';
import '../../StyleSheets/web.css';
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import NavBar from '../../Components/Navbar';
import ApplicantSideBar from '../../Components/ApplicantSideBar';
import AvailableJobs from '../../Components/AvailableJobs';
import dp from '../../Logos/IAS-logo.png';
import { SavedData } from '../../Components/SavedJobs';
import { MyJobs } from '../../Components/MyJobs';
import JobCard from '../../Components/JobCard';
import Icon from '@mdi/react';
import { mdiMagnify, mdiMapMarker, mdiWindowClose, mdiBookmarkCheckOutline } from '@mdi/js';
import { useHistory } from 'react-router';
import UserContext from '../../Context/User';
import axios from 'axios';

function ApplicantJobPortal() {
    const [show, setShow] = useState(false);
    const [apply, setApply] = useState(false);
    const [data, setData] = useState()
    const History = useHistory();
    const { user, setUser } = useContext(UserContext);
    const callBackFunction = (childData) => {
        setData(childData)
    }
    const [DisplayJob, setDisplayJob] = useState(true);
    const [DisplayMyJobs, setDisplayMyJobs] = useState(false);
    const [DisplaySavedJobs, setDisplaySavedJobs] = useState(false);
    useEffect(()=>{
        axios.get('https://iastestingapi.herokuapp.com/api/job/getAllJobs/1', { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
                console.log(res)
        }).catch(async (err) => {
            console.log(err)
        })
    })


    return (
        <div>
            <ApplicantSideBar />
            <NavBar />
            <div className='ProfilePage' >

                <div className={`JobContainer ${DisplayJob ? '' : 'hide'}`}  >
                    <p className='ApplicantInfoHeader'>Jobs</p>

                    <div className='JobSearchBarContainer'>
                        <div className='SearchBoxWrap'>
                            <input className='SearchInput' type='text' placeholder='Search by title, skill or company' />
                            <Icon className='SearchIcon' path={mdiMagnify} size={1} />
                        </div>
                        <div className='SearchBoxWrap'>
                            <input className='SearchInput' type='text' placeholder='Location' />
                            <Icon className='SearchIcon' path={mdiMapMarker} size={1} />
                        </div>
                        <div className='SearchButton'>
                            Search
                        </div>
                    </div>

                    <div className='SearchDropdownWrap'>
                        <Dropdown
                            placeholder="Jobs"
                            className="SearchDropdown"
                            options={['All', 'Jobs', 'people', "Compnay"]}
                            value="Jobs"
                        />
                        <Dropdown
                            placeholder="Date Posted"
                            options={['Any Time', 'Past Month', 'Past Week', "Past 24 hours"]}
                        // value="Any Time"
                        />
                        <Dropdown
                            placeholder="Experience Level"
                            options={["All", 'Internship', 'Entry level', 'Mid-Senior level', "Director", "Executive"]}
                        // value="All"
                        />
                        <Dropdown
                            placeholder="Job Type"
                            options={['All', 'Full-time', 'Part-time', "Contract", 'Temporary', 'Internship']}
                        // value="All"
                        />
                        <Dropdown
                            placeholder="On-site/Remote"
                            options={['All', 'On-site', 'Remote', "Hybrid"]}
                        // value="All"
                        />
                    </div>

                    <div><AvailableJobs show={show} onClick={() => setShow(true)} parentCallBack={callBackFunction} Apply={setApply} /></div>
                </div>
                <div className={`JobContainer ${DisplayMyJobs ? '' : 'hide'}`}>
                    <p className='ApplicantInfoHeader'> My Jobs</p>
                    {MyJobs.map((data, index) =>
                        <div className='JobWrap' key={index}>
                            <div className='JobPicWrap'>
                                {data.Pic}
                            </div>
                            <div className='JobInfoWrap'>
                                <div className='InfoAndIconContainer'>
                                    <p className='JobPosition'
                                        onClick={() => {
                                            callBackFunction(data)
                                            setShow(true)
                                            if (MyJobs !== []) {
                                                MyJobs.map((item, index) => {
                                                    if (data.title === item.title) {
                                                        setApply(true)
                                                    }
                                                })
                                            }
                                        }}>{data.title}
                                    </p>
                                    <div className="JobSaveButtonWrap">
                                        <Icon className='JobSaveButton' path={mdiWindowClose} size={1} />
                                    </div>
                                </div>
                                <p className='JobCompany'>{data.Company}</p>
                                <p className='JobLocation'>{data.Location}</p>
                                <p className='PublishTime'>{data.Time}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className={`JobContainer ${DisplaySavedJobs ? '' : 'hide'}`} >
                    <p className='ApplicantInfoHeader'> Saved Jobs</p>
                    {SavedData.map((data, index) =>
                        <div className='JobWrap' key={index}>
                            <div className='JobPicWrap'>
                                {data.Pic}
                            </div>
                            <div className='JobInfoWrap'>
                                <div className='InfoAndIconContainer'>
                                    <p className='JobPosition'
                                        onClick={() => {
                                            callBackFunction(data)
                                            setShow(true)
                                            if (MyJobs !== []) {
                                                MyJobs.map((item, index) => {
                                                    if (data.title === item.title) {
                                                        setApply(true)
                                                    }
                                                })
                                            }
                                        }}>{data.title}
                                    </p>
                                    <div className="JobSaveButtonWrap">
                                        <Icon className='JobSaveButton'
                                            onClick={
                                                () => {
                                                    SavedData.map((item,index)=>{
                                                        if(data.title===item.title)
                                                        {
                                                            SavedData.splice(index,1)
                                                        }
                                                    })
                                                }
                                            }
                                            path={mdiBookmarkCheckOutline} size={1} />
                                    </div>
                                </div>
                                <p className='JobCompany'>{data.Company}</p>
                                <p className='JobLocation'>{data.Location}</p>
                                <p className='PublishTime'>{data.Time}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='ProfileNavigateMenuWrap' >
                    <div className="ProfileNavigateMenu">
                        <p
                            className={`ProfileNavigateButton ${DisplayJob ? 'active' : ''}`}
                            onClick={() => {
                                setDisplayJob(true);
                                setDisplayMyJobs(false)
                                setDisplaySavedJobs(false);
                            }
                            }>
                            Jobs
                        </p>
                        <p
                            className={`ProfileNavigateButton ${DisplayMyJobs ? 'active' : ''}`}
                            onClick={() => {
                                setDisplayJob(false);
                                setDisplayMyJobs(true)
                                setDisplaySavedJobs(false);
                            }
                            }>
                            My Jobs
                        </p>
                        <p
                            className={`ProfileNavigateButton ${DisplaySavedJobs ? 'active' : ''}`}
                            onClick={() => {
                                setDisplayJob(false);
                                setDisplayMyJobs(false)
                                setDisplaySavedJobs(true);
                            }
                            }>
                            Saved Jobs
                        </p>

                    </div>
                </div>
            </div>
            <JobCard show={show} onClose={() => setShow(false)} Data={data} Apply={apply} SetApply={setApply} />
        </div>
    );
}

export default ApplicantJobPortal;