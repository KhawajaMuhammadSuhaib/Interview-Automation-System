import React, { useContext, useState } from "react";
import { Button } from "primereact/button";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
// import '../StyleSheets/web.css'
import ApplicantSideBar from '../../../Components/ApplicantSideBar';
import NavBar from '../../../Components/Navbar';
import axios from "axios";
import UserContext from "../../../Context/User";
import { useHistory } from 'react-router';
import { ProgressSpinner } from "primereact/progressspinner";


export default function TaskInterview(props) {
    const { user } = useContext(UserContext)
    const History = useHistory();
    const [loading, setLoading] = useState(false)
    const date = new Date(props.data.deadline * 1000);
    const [link, setLink] = useState('')
    const onSubmit = async () => {
        setLoading(true)
        const data = {
            jobID: props.data.jobID,
            link: link
        }
        axios.put('https://iastestingapi.herokuapp.com/api/interviews/submitProject', { ...data }, { headers: { 'x-access-token': user.token } })
            .then(res => {
                console.log(res);
                setLoading(false)
                History.push('/Jobs')
            })
            .catch(err => {
                setLoading(false)
                console.log(err);
            })


    }
    return (
        <div className="">
            <ApplicantSideBar />
            <NavBar />
            <div className='body-content'>
                <p className='UnderLineHeader'>Interviews</p>

                {
                    loading ?
                        <div className="Center">
                            <ProgressSpinner />
                        </div>
                        :
                        <div style={{ margin: '15px 50px' }}>

                            <div className="TaskHeader">
                                <div className="intoTask">
                                    <p className="Taskheader" style={{ marginbottom: '0px' }}>Task Assesment Interview</p>
                                    <p className="TaskSub">Deadline : {date.toLocaleDateString("en-US")}</p>
                                </div>
                                <div style={{ display: 'flex', width: '30%' }}>
                                    <div className="ApplyButton" style={{ marginRight: '10px', width: "100%" }}>Request Call</div>
                                    <div className="ApplyButton" onClick={onSubmit} style={{ marginRight: '40px', width: "100%" }}>Submit</div>
                                </div>
                            </div>
                            <div className="TaskSpace">
                                <p className="TaskInstruction">Instructions</p>
                                <p className="TaskInstructionDetails">{props.data.instructions}</p>
                            </div>
                            <div className="TaskSpace">
                                <p className="TaskInstruction">Description</p>
                                <p className="TaskInstructionDetails">None</p>
                            </div>
                            <div className="TaskSpace">
                                <p className="TaskInstruction">Assessment Link</p>
                                <a href={props?.data?.fileLink} >view Assessment</a>
                            </div>
                            <div className="TaskSpace">
                                <p className="TaskMyWork">My work</p>
                                {/* <div>
                            <p className="interviewSubheading">Please upload the zip file of your work</p>
                            <input type='file' required />
                        </div> */}
                                <div className="TaskSpace">
                                    <p className="interviewSubheading">Paste the link of git repository of your work.</p>
                                    <input className='QuestionInput' style={{ width: '100%' }} value={link} type='text' required onChange={(e) => setLink(e.target.value)} />
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};
