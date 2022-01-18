import { Button } from "primereact/button";
import React, { useContext, useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useHistory } from 'react-router';

// import Icon from '@mdi/react';
// import { mdiVideoOff, mdiVideo, mdiRecord, mdiCheckboxBlank, mdiDownload } from '@mdi/js';
import { useTimer } from 'react-timer-hook';
import UserContext from "../../../Context/User";
// import '../StyleSheets/web.css'
import axios from "axios";


export default function QuestionInterview(props) {
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
    if (i === 1) {
      setFinish(true)
    }
  }
  const HandleSubmission = () => {
    const data = {
      jobID: props.data.jobID,
      totalNumber: answer
    }
    console.log(data)
    axios.put('https://iastestingapi.herokuapp.com/api/interviews/submitQuestionnarie', { ...data }, { headers: { 'x-access-token': user.token } })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    props.onClose()
  }

  return (
    <div className='QuestionnareScreenContainer'>
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
                  <div className="p-field-radiobutton">
                    <RadioButton className="radioB" inputId="option1" name="option" value={Questions[i].option1} onChange={(e) => setOption(e.target.value)} checked={option === Questions[i].option1} />
                    <label style={{ margin: 'auto' }} htmlFor="option1">{Questions[i].option1}</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton className="radioB" inputId="option2" name="option" value={Questions[i].option2} onChange={(e) => setOption(e.target.value)} checked={option === Questions[i].option2} />
                    <label htmlFor="option2">{Questions[i].option2}</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton className="radioB" inputId="option3" name="option" value={Questions[i].option3} onChange={(e) => setOption(e.target.value)} checked={option === Questions[i].option3} />
                    <label htmlFor="option3">{Questions[i].option3}</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton className="radioB" inputId="option4" name="option" value={Questions[i].option4} onChange={(e) => setOption(e.target.value)} checked={option === Questions[i].option4} />
                    <label htmlFor="option4">{Questions[i].option4}</label>
                  </div>
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
