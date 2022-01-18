import React, { useRef, useState, useContext, useEffect } from 'react'
import { Toast } from 'primereact/toast';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import UserContext from '../../../Context/User';
import { Calendar } from 'primereact/calendar';
export default function LiveInterview(props) {
    const { user } = useContext(UserContext);
    const [time, setTime] = useState(null);
    const [data, setData] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [scheduleRooms, setScheduleRooms] = useState(false);
    const [scheduled, setScheduled] = useState(null)
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [userID,setUserID]=useState(null)
    const toastBR = useRef(null);
    const showError = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }
    const showSuccess = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'Successfull', detail: message, life: 3000 });
    }
    const dialogFuncMap = {
        'scheduleRooms': setScheduleRooms,
        'displayBasic2': setDisplayBasic2,
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div className='QuestionButtonContainer'style={{marginTop:'10px'}}>
                <div className='CreateInterviewRandomButton'style={{width:'100px'}} onClick={ScheduleInterview}>Schedule</div>
                <div className='CancelButton' onClick={() => onHide(name)} style={{width:'100px'}}>Cancel</div>
            </div>
        );
    }
    useEffect(() => {
        setLoading1(true)
        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getFinalList/' + props.ID, { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
            setData(res.data)
            setLoading1(false)
            console.log(res)
        }).catch(async (err) => {
            console.log(err)
            setLoading1(false)
        })
    }, [])

    const GetScheduleInterviews = () => {
        onClick('scheduleRooms')
        setLoading2(true)
        axios.get('https://iastestingapi.herokuapp.com/api/interviews/getScheduledRooms/' + props.ID, { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
            setScheduled(res.data)
            setLoading2(false)
            console.log(res)
        }).catch(async (err) => {
            setLoading2(false)
            console.log(err)
        })
    }
    const ScheduleInterview = () => {
        const data = {
            userID: userID,
            jobID: props.ID,
            startTime:new Date(time).getTime() / 1000
        }
        axios.post('https://iastestingapi.herokuapp.com/api/interviews/scheduleLiveInterview', { ...data }, { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
            onHide('displayBasic2')
            showSuccess('Interview Scheduled successfully')
            console.log(res)
        }).catch(async (err) => {
            showError('Interview Scheduling failed')
            console.log(err)
        })
    }
    const AcceptApplicant=(id)=>{
        const data={
            userID: id,
            jobID: props.ID,
        }
        showSuccess("User Selected and Email is sent ro user.")
        axios.put('https://iastestingapi.herokuapp.com/api/interviews/finalSelect', { ...data }, { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
     
            console.log(res)
        }).catch(async (err) => {
            // showError('Interview Scheduling failed')
            console.log(err)
        })
    }
    return (
        <div>
            <Toast ref={toastBR} position="bottom-right" />
            <div >
                <Icon className='backIcon' path={mdiArrowLeft} size={1} onClick={props.onClose} />
            </div>
            <div className='interviewProcessHeaderWrap'>
                <p className='interviewProcessHeader'>Face to Face Interviews</p>
                <div className='interviewProcessHeaderButton' onClick={GetScheduleInterviews}>Scheduled Rooms</div>
            </div>
            <div>
                <div className='JobTableHeaderRow spacing '>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Name</div>
                    <div className='JobTableHeader'>Job Title</div>
                    <div className='JobTableHeader'>Option</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>
                {
                    loading1 ?
                        <div className='Center'>
                            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="2" animationDuration=".5s" />
                        </div>
                        :
                        <>
                            {
                                data !== null && data.length!==0 ?
                                    <>
                                        {
                                            data.map((data, index) => {
                                                return (
                                                    <div className='JobTableDataRow spacing' key={index}>
                                                        <div className='JobTableColumn '>{index + 1}</div>
                                                        <div className='JobTableColumn Title'>{data?.userID?.name}</div>
                                                        <div className='JobTableColumn'>{data?.jobID?.title}</div>

                                                        {
                                                            data.liveInterview ?
                                                                <div className='JobTableColumn link' ><p className='Scheduled'>Scheduled</p></div>
                                                                :
                                                                <div className='JobTableColumn link' onClick={() => {setUserID(data?.userID?._id);onClick('displayBasic2')}} ><p className='Schedule'>Schedule</p></div>
                                                        }
                                                        <div className='JobTableColumn' style={{ border: 'none' }}><p className='Schedule' style={{backgroundColor:'green'}} onClick={()=>AcceptApplicant(data?.userID?._id)}>Accept</p></div>

                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <div className='Center'>
                                        <p>No Data to Show</p>
                                    </div>

                            }

                        </>
                }
                <Dialog header="Scheduled Interviews" visible={scheduleRooms} style={{ width: '70vw' }} onHide={() => onHide('scheduleRooms')}>
                    <div className='JobTableHeaderRow spacing '>
                        <div className='JobTableHeader'>Index</div>
                        <div className='JobTableHeader'>Name</div>
                        <div className='JobTableHeader'>Room</div>
                        <div className='JobTableHeader'>Start Time</div>
                        <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                    </div>
                    {
                        loading2 ?
                            <div className='Center'>
                                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="2" animationDuration=".5s" />
                            </div>
                            :
                            <>
                                {
                                    scheduled !== null && scheduled.length!==0 ?
                                        <>
                                            {
                                                scheduled.map((data, index) => {
                                                    return (
                                                        <div className='JobTableDataRow spacing' key={index}>
                                                            <div className='JobTableColumn '>{index + 1}</div>
                                                            <div className='JobTableColumn Title'>{data?.userID?.name}</div>
                                                            <div className='JobTableColumn'>{data?.roomName}</div>
                                                            <div className='JobTableColumn'>{new Date(data.startTime * 1000).getDate()+"/"+(new Date(data.startTime * 1000).getMonth()+1)+"/"+new Date(data.startTime * 1000).getFullYear()+" "+new Date(data.startTime * 1000).getHours()+":"+new Date(data.startTime * 1000).getMinutes()+":"+new Date(data.startTime * 1000).getSeconds()}</div>
                                                            <div className='JobTableColumn link' style={{ border: 'none' }} ><a href={data.adminLink} className=''>Join</a></div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                        :
                                        <div className='Center'>
                                            <p>No Data to Show</p>
                                        </div>
                                }
                            </>
                    }
                </Dialog>
                <Dialog header="Interview Time" visible={displayBasic2} style={{ width: '30vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('scheduleRooms')}>
                <div className="">
                        <p>Time Of Interview Session :</p>
                        <Calendar  value={time} onChange={(e) => setTime(e.value)}  hourFormat="12" showTime />
                    </div>
                </Dialog>
            </div>
            
        </div>
    )
}