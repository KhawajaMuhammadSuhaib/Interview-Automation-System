import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useHistory } from 'react-router';
import Iframe from 'react-iframe'
// import Icon from '@mdi/react';
// import { mdiVideoOff, mdiVideo, mdiRecord, mdiCheckboxBlank, mdiDownload } from '@mdi/js';
import { useTimer } from 'react-timer-hook';
import UserContext from "../../../Context/User";
// import '../StyleSheets/web.css'
import axios from "axios";


export default function AlgorithmInterview(props) {
  const History = useHistory();

  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(null);
  const [finish, setFinish] = useState(false)
  const Questions = props.data.questions;
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState(0);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 700); // 10 minutes timer
  const {
    seconds,
    minutes,
    start,
    days,
  } = useTimer({ expiryTimestamp: time, autoStart: false, onExpire: () => console.warn('onExpire called') });

  //   useEffect(()=>{
  //       start()
  //   })
  const HandleQuestion = () => {
    // console.log(Questions.length)
    console.log(option)
    if (i < Questions.length) {
      if (option === (Questions[i].answer)) {
        console.log(option)
        setAnswer(answer + 1)
      }
      console.log(answer)
      setI(i + 1)
    }
    if (i === 4) {
      setFinish(true)
    }
    setOption('')
  }

  const HandleSubmission = () => {
    const data = {
      jobID: props.data.jobID,
      length: Questions.length,
      resultCount: answer
    }
    console.log(data)
    axios.put('https://iastestingapi.herokuapp.com/api/interviews/submitAlgorithm', { ...data }, { headers: { 'x-access-token': user.token } })
      .then(res => {
        console.log(res);
        History.push('/Jobs')
      })
      .catch(err => {
        console.log(err);
      })
    props.onClose()
  }

  return (
    <div className='QuestionnareScreenContainer'>
      <Iframe title="coding" frameBorder="0" width="50%" height="800px" url="https://replit.com/@Architect/IAS-Algorithm-Test-1?embed=true"></Iframe>
      <div className="QuestionFormContainer">
        <div className="QuestionFormHeader">
          <p className="QuestionHead">{props.data.testName}</p>
          <div className="TimeDate">
            <p className="Time">Time: <span>{minutes}</span>:<span>{seconds}</span></p>
            <p className="Date">Question: {i + 1} / {Questions.length}</p>
          </div>
          <p className="QuestionInstruction">Instructions</p>
          <p className="QuestionInstructionDetail">Attempt all the question.</p>
        </div>
        <div className="QuestionFormBody">
          {
            i < Questions.length ?
              <div className="QustionContainer">
                <p>{i + 1}. {Questions[i].question}</p>
                <div>
                  <input className="DeadlineInput" value={option} style={{ width: '100%' }} type='text' onChange={(e) => setOption(e.target.value)} />
                </div>
              </div>
              :
              <div>
                <p>Submit Response</p>
              </div>

          }
          {
            finish ?
              <button className="more" onClick={HandleSubmission}>Submit</button>
              :
              <button className="more" onClick={HandleQuestion}>Next</button>
          }
        </div>
      </div>
    </div>
  );
};
