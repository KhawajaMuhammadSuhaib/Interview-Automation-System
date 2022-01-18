import React, { useRef, useState, useContext } from 'react'
import { Toast } from 'primereact/toast';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import UserContext from '../../../Context/User';


export default function CodingInterview(props) {
    const [Question, setQuestion] = useState({
        question: '',
        answer: ''
    });
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(false);
    const [lastDate, setLastDate] = useState(null);
    const [attemptTime, setAttemptTime] = useState(null)
    const [questionInArray, setQuestionInArray] = useState([]);
    const toastBR = useRef(null);
    const showError = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }
    const showSuccess = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'Interview Created', detail: message, life: 3000 });
    }
    const CreateInterview = () => {
        if (lastDate === null || attemptTime === null || questionInArray === []) {
            showError('Please provide all the details required to attempt the interview')
            setLoading(false)
        }
        else {
            setLoading(true)
            const data = {
                jobID: props.ID,
                totalTime: parseInt(attemptTime),
                testName: 'Coding & Algorithm Interview',
                deadline: new Date(lastDate).getTime() / 1000,
                questions: questionInArray
            }
            console.log(data)
            axios.post('https://iastestingapi.herokuapp.com/api/interviews/createAlgorithmInterview', { ...data }, { headers: { 'x-access-token': user.token } }
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
    const RandomInterview = () => {
        setLoading(true)
        if (lastDate === null || attemptTime === null) {
            showError('Please provide Last date and time for attempting the interview')
            setLoading(false)
        }
        else {
            const data = {
                jobID: props.ID,
                totalTime: parseInt(attemptTime),
                testName: 'Coding & Algorithm Interview',
                deadline: new Date(lastDate).getTime() / 1000,
            }
            console.log(data)
            axios.post('https://iastestingapi.herokuapp.com/api/interviews/randomAlgorithm', { ...data }, { headers: { 'x-access-token': user.token } }
            ).then(async (res) => {
                setLoading(false)
                showSuccess('Interview created successfully.')
                console.log(res)
                props.onClose();
            }).catch(async (err) => {
                showError("Error in interview creation please review all feilds and try again");
                console.log(err)
                setLoading(false)
            })
        }
    }
    return (
        <div>
            <div className="">
                <Toast ref={toastBR} position="bottom-right" />
                <div>
                    <Icon path={mdiArrowLeft} size={1} onClick={props.onClose} />
                </div>
                <p className='UnderLineHeader'> Coding & Algorithm Interview Setup</p>
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
                                                    <p className='Questionstatement'>{index + 1}.{data.question}</p>
                                                    <p className='Questionstatement'>Correct Answer : {data.answer}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </>

                                :
                                <></>
                        }

                        <p className='interviewSubheading'>Please specify the Questions of the interview below. (Maximum Five)</p>
                        <div className='AddQuestionWrap'>
                            <input value={Question.question} className='QuestionInput' placeholder='Question Statement' type='text' onChange={(e) => setQuestion({ ...Question, question: e.target.value })} />
                            <div
                                className='QuestionButton'
                                onClick={() => {
                                    if (questionInArray.length < 5 && Question.question !== '' && Question.answer !== '') {
                                        setQuestionInArray(questionInArray => [...questionInArray, Question])
                                        setQuestion({ ...Question, question: "", answer: '' })
                                    }
                                    else {
                                        showError("Please Fill all Feilds.")
                                    }
                                }}
                            >
                                Add Question
                            </div>
                        </div>
                        <div className='optionContainer'>
                            <input value={Question.answer} className='QuestionOption' placeholder='Correct answer' type='text' onChange={(e) => setQuestion({ ...Question, answer: e.target.value })} />
                        </div>
                    </div>
                    <div className='randomQuestionContainer'>
                        <p className='interviewHeading'>Setup Automatically</p>
                        <p className='interviewSubheading'>To setup interview automaticaly just give last dast and time.</p>
                        <div className='CreateInterviewRandomButton' onClick={RandomInterview}>Create Random Questions</div>
                    </div>

                    <div className='QuestionButtonContainer' style={{ marginTop: '70px' }}>
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
                {
                    loading ?
                        <div className='loaderContainer'>
                            <ProgressSpinner />
                        </div>
                        :
                        ''
                }
            </div>

        </div>
    )
}