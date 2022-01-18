import React, { useRef, useState, useContext, useEffect } from 'react'
import { Toast } from 'primereact/toast';
import RecordedInterview from './RecordedInterview';
import QuestionnareInterview from './QuestionnareInterview';
import AssessmentInterview from './AssessmentInterview';
import LiveInterview from './LiveInterview';
import CodingInterview from './AlgorithmInterview';
import InterviewReport from './InterviewReport';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import UserContext from '../../../Context/User';
import { ProgressSpinner } from 'primereact/progressspinner';
import PopUp from '../../../Components/PopUp';

export default function AllInterview(props) {
    const { user } = useContext(UserContext)
    const [interview, setInterview] = useState(true)
    const [recorded, setRecorded] = useState(false);
    const [questionare, setQuestionare] = useState(false);
    const [coding, setCoding] = useState(false);
    const [assessment, setAssessment] = useState(false);
    const [live, setLive] = useState(false);
    const [recordData, setRecordData] = useState(null);
    const [questionData, setQuestionData] = useState(null);
    const [algoData, setAlgoData] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [reportData, setReportData] = useState('')
    const [showreport, setShowReport] = useState(false)
    const toastBR = useRef(null);
    const showError = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }
    const showSuccess = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'Interview Created', detail: message, life: 3000 });
    }

    useEffect(() => {
        setLoading(true)

        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getRecordedCount/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
            .then(res => { setRecordData(res.data);console.log(res.data) })
            .catch(err => { console.log(err) });

        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getMcqCount/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
            .then(res => { setQuestionData(res.data); })
            .catch(err => { console.log(err) });

        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getAlgoCount/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
            .then(res => { setAlgoData(res.data) })
            .catch(err => { console.log(err) });

        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getProjectCount/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
            .then(res => { setTaskData(res.data); setLoading(false) })
            .catch(err => { console.log(err); setLoading(false) });

    }, [interview])
    const ShowRecorded = () => {
        setRecorded(true);
        setQuestionare(false);
        setCoding(false);
        setAssessment(false);
        setLive(false);
        setInterview(false);
        console.log(props.ID)
    }
    const ShowQuestionare = () => {
        setRecorded(false);
        setQuestionare(true);
        setCoding(false);
        setAssessment(false);
        setLive(false);
        setInterview(false)

    }
    const ShowCoding = () => {
        setRecorded(false);
        setQuestionare(false);
        setCoding(true);
        setAssessment(false);
        setLive(false);
        setInterview(false)

    }
    const ShowAssessment = () => {
        setRecorded(false);
        setQuestionare(false);
        setCoding(false);
        setAssessment(true);
        setLive(false);
        setInterview(false)

    }
    const ShowLive = () => {
        setRecorded(false);
        setQuestionare(false);
        setCoding(false);
        setAssessment(false);
        setLive(true);
        setInterview(false)

    }
    const ShowAllInterview = () => {
        setInterview(true);
        setRecorded(false);
        setQuestionare(false);
        setCoding(false);
        setAssessment(false);
        setLive(false);

    }
    const ViewReports = (id) => {
        if (props.data?.start) {
            setInterview(false)
            setShowReport(true)
            setLoading1(true)
            console.log('print report')
            if (id === 1) {
                axios.get('https://iastestingapi.herokuapp.com/api/interviews/getRecordedResult/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
                    .then(res => {
                        setReportData(() => res.data)
                        setLoading1(false)
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else if (id === 2) {
                axios.get('https://iastestingapi.herokuapp.com/api/interviews/getQuestionnarieResult/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
                    .then(res => {
                        setReportData(() => res.data)
                        setLoading1(false)
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else if (id === 3) {
                axios.get('https://iastestingapi.herokuapp.com/api/interviews/getAlgorithmResult/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
                    .then(res => {
                        setReportData(() => res.data)
                        setLoading1(false)
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
            else if (id === 4) {
                axios.get('https://iastestingapi.herokuapp.com/api/interviews/getProjectResult/' + props.data?.jobID, { headers: { 'x-access-token': user.token } })
                    .then(res => {
                        setReportData(() => res.data)
                        setLoading1(false)
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        }
        else {
            setPopUp(true);
        }
    }
    const startInterview = () => {
        if (props.data?.start) {
            const data = {
                jobID: props.data?.jobID
            }
            axios.put('https://iastestingapi.herokuapp.com/api/interviews/startInterviews', { ...data }, { headers: { 'x-access-token': user.token } })
                .then(res => {
                    console.log(res)
                    showSuccess(res.data.response)
                })
                .catch(err => {
                    console.log(err?.response?.data?.msg)
                    showError(err?.response?.data?.msg)
                })
        }

    }
    return (
        <div>
            <Toast ref={toastBR} position="bottom-right" />
            <div className={interview ? "" : "hide"}>
                <div >
                    <Icon className='backIcon' path={mdiArrowLeft} size={1} onClick={props.onClose} />
                </div>
                <div className='interviewProcessHeaderWrap'>
                    <p className='interviewProcessHeader'>{props?.data?.jobName} Interviews</p>
                    <div onClick={startInterview} className={props?.data?.start ? 'interviewProcessHeaderButton' : 'interviewProcessHeaderButtonDisable'}>Start interview process</div>
                </div>
                <div className='JobTableHeaderRow '>
                    <div className='JobTableHeader'>Job Title</div>
                    <div className='JobTableHeader'>Applicants</div>
                    <div className='JobTableHeader'>Completed</div>
                    <div className='JobTableHeader'>Pending</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>
                {
                    loading ?
                        <div className='Center'>
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="2" animationDuration=".5s" />
                        </div>
                        :
                        <>
                            <div className='JobTableDataRow spacing '>
                                <div className='JobTableColumn Title'>Recorded Interview</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn'>{recordData?.Completed}</div>
                                <div className='JobTableColumn'>{recordData?.Pending}</div>
                                <div className='JobTableColumn ' style={{ border: 'none', color: '#40A9FF' }} >
                                    {
                                        recordData?.created ?
                                            <p onClick={() => ViewReports(1)} >View Reports</p>
                                            :
                                            <p onClick={ShowRecorded}>Create</p>
                                    }

                                </div>
                            </div>
                            <div className='JobTableDataRow spacing '>
                                <div className='JobTableColumn Title'>Questionnare Interview</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn'>{questionData?.Completed}</div>
                                <div className='JobTableColumn'>{questionData?.Pending}</div>
                                <div className='JobTableColumn ' style={{ border: 'none', color: '#40A9FF' }}  >
                                    {
                                        questionData?.created ?
                                            < p onClick={() => ViewReports(2)}  >View Reports</p>
                                            :
                                            <p onClick={ShowQuestionare}>Create</p>
                                    }
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing '>
                                <div className='JobTableColumn Title'>Coding & Algorithm</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn'>{algoData?.Completed}</div>
                                <div className='JobTableColumn'>{algoData?.Pending}</div>
                                <div className='JobTableColumn' style={{ border: 'none', color: '#40A9FF' }} >
                                    {
                                        algoData?.created ?
                                            <p onClick={() => ViewReports(3)}>View Reports</p>
                                            :
                                            <p onClick={ShowCoding}>Create</p>
                                    }
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing '>
                                <div className='JobTableColumn Title'>Task Assessment</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn'>{taskData?.Completed}</div>
                                <div className='JobTableColumn'>{taskData?.Pending}</div>
                                <div className='JobTableColumn ' style={{ border: 'none', color: '#40A9FF' }}>
                                    {
                                        taskData?.created ?
                                            < p onClick={() => ViewReports(4)} >View Reports</p>
                                            :
                                            <p onClick={ShowAssessment}>Create</p>
                                    }
                                </div>
                            </div>
                            <div className='JobTableDataRow spacing '>
                                <div className='JobTableColumn Title'>Face to Face</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn'>0</div>
                                <div className='JobTableColumn'>20</div>
                                <div className='JobTableColumn ' style={{ border: 'none', color: '#40A9FF' }} onClick={ShowLive}>
                                    <p>View</p>
                                </div>
                            </div>
                        </>
                }
            </div>
            <div className={recorded ? '' : 'hide'}>
                <RecordedInterview onClose={ShowAllInterview} ID={props.data?.jobID} />
            </div>
            <div className={questionare ? '' : 'hide'}>
                <QuestionnareInterview onClose={ShowAllInterview} ID={props.data?.jobID} />
            </div>
            <div className={coding ? '' : 'hide'}>
                <CodingInterview onClose={ShowAllInterview} ID={props.data?.jobID} />
            </div>
            <div className={assessment ? '' : 'hide'}>
                <AssessmentInterview onClose={ShowAllInterview} ID={props.data?.jobID} />
            </div>
            <div className={live ? '' : 'hide'}>
                <LiveInterview onClose={ShowAllInterview} ID={props.data?.jobID} />
            </div>
            <div className={popUp ? '' : 'hide'}>
                <PopUp show={popUp} onClose={() => setPopUp(false)} title='Interview not started yet'>
                    Create all the remaining interviews and than start the interview process to see the reports.
                </PopUp>
            </div>
            {
                showreport ?
                    <>
                        {
                            loading1 ?
                                <div className='Center'>
                                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="2" animationDuration=".5s" />
                                </div>
                                :
                                <InterviewReport data={reportData} onClose={()=>{setShowReport(false);setInterview(true)}} />
                        }
                    </>
                    :
                    <></>
            }

        </div>
    )
}