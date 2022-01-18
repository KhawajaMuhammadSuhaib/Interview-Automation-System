import React, { useRef, useState, useContext } from 'react'
import { Toast } from 'primereact/toast';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import UserContext from '../../../Context/User';
import { ProgressSpinner } from 'primereact/progressspinner';


export default function RecordedInterview(props) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [lastDate, setLastDate] = useState(null);
    const [attemptTime, setAttemptTime] = useState(null)
    const [Question, setQuestion] = useState('');
    const [questionInArray, setQuestionInArray] = useState([]);
    const toastBR = useRef(null);

    const showError = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }
    const showSuccess = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'Interview Created', detail: message, life: 3000 });
    }
    const CreateInterview = () => {
        setLoading(true)
        if (lastDate === null || attemptTime === null || questionInArray === []) {
            showError('Please provide all the details required to attempt the interview')
            setLoading(false)
        }
        else
        {
            const data = {
                jobID: props.ID,
                totalTime: parseInt(attemptTime),
                testName: 'Record Interview',
                deadline: new Date(lastDate).getTime() / 1000,
                questions: questionInArray
            }
            console.log(data)
            axios.post('https://iastestingapi.herokuapp.com/api/interviews/createRecordedInterview', { ...data }, { headers: { 'x-access-token': user.token } }
            ).then(async (res) => {
                setLoading(false)
                showSuccess('Interview created successfully.')
                props.onClose();
                console.log(res)
            }).catch(async (err) => {
                showError("Error in interview creation please review all feilds and try again");
                console.log(err)
                setLoading(false)
            })
        }
    }
    return (
        <div>
            <div>
                <Toast ref={toastBR} position="bottom-right" />
                <div>
                    <Icon path={mdiArrowLeft} size={1} onClick={props.onClose} />
                </div>
                <p className='UnderLineHeader'>Recorded Interview Setup</p>
                <div className='RecordQuestionFormContainer'>
                    <div className='DeadlineContainer'>
                        <div className='DeadlineWrap'>
                            <p className='interviewHeading'>Last date</p>
                            <p className='interviewSubheading'>Please specify the closing date of the interview.</p>
                            <input className='DeadlineInput' type='date' onChange={(e) => setLastDate(e.target.value)} />
                        </div>
                        <div className='DeadlineWrap'>
                            <p className='interviewHeading'>Attempting Time</p>
                            <p className='interviewSubheading'>Please specify the time required to attempt the interview.</p>
                            <div className='DeadlineInputWrap'>
                                <input className='timeInput' type='text' onChange={(e) => setAttemptTime(e.target.value)} />
                                <p style={{ margin: 'auto', fontWeight: 'bold', color: '#af0000' }}>Minutes</p>
                            </div>
                        </div>
                    </div>
                    <div className='QuestionWrap'>
                        <p className='interviewHeading'>Questions</p>
                        {
                            questionInArray !== [] ?
                                <>
                                    {
                                        questionInArray.map((data, index) => {
                                            return (
                                                <div className='SetQuestions' key={index}>
                                                    <p className='Questionstatement'>{index + 1}.{data}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </>

                                :
                                <></>
                        }

                        <p className='interviewSubheading'>Please specify the Questions of the interview below. (Maximum Two)</p>
                        <div className='AddQuestionWrap'>
                            <input value={Question} className='QuestionInput' type='text' onChange={(e) => setQuestion(e.target.value)} />
                            <div
                                className='QuestionButton'
                                onClick={() => {
                                    if (questionInArray.length < 2) {
                                        setQuestionInArray(questionInArray => [...questionInArray, Question])
                                    }
                                    else {
                                        showError("Interview question must not be greater than Two.")
                                    }
                                }}
                            >
                                Add Question
                            </div>
                        </div>

                    </div>

                    <div className='QuestionButtonContainer'>
                        {
                            loading ?
                                <div className='CreateInterviewButton'>
                                    <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="10" animationDuration=".5s" />
                                </div>
                                :
                                <div className='CreateInterviewButton' onClick={CreateInterview}>
                                    Create
                                </div>

                        }
                        <div className='CancelButton' onClick={props.onClose}>Cancel</div>
                    </div>
                </div>
            </div>
            {
                loading ?
                    <div className='loaderContainer'>
                        <ProgressSpinner />
                    </div>
                    :
                    ''
            }
        </div>
    )
}