import React, { useContext, useState } from "react";
import { useRecordWebcam, CAMERA_STATUS } from "react-record-webcam";
import Icon from '@mdi/react';
import { mdiVideoOff, mdiVideo, mdiRecord, mdiCheckboxBlank, mdiDownload } from '@mdi/js';
import { useTimer } from 'react-timer-hook';
import '../../../StyleSheets/web.css'
import axios from "axios";
import { ProgressSpinner } from 'primereact/progressspinner';

// import { useHistory } from 'react-router';
import UserContext from "../../../Context/User";


export default function RecordVideo(props) {
  // const History = useHistory();
  const { user } = useContext(UserContext);
  const [url, setUrl] = useState('')
  const [loader, setLoader] = useState(false)

  const recordWebcam = useRecordWebcam();

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const {
    seconds,
    minutes,
    start,
    days,
  } = useTimer({ expiryTimestamp: time, autoStart: false, onExpire: () => {alert('Time up '); OnSubmit()} });

  const OnSubmit = async () => {
    setLoader(true);
    const blob = await recordWebcam.getRecording();
    const data = new FormData()
    data.append("file", blob)
    data.append("upload_preset", "sentiment")
    data.append("cloud_name", "dx6obccn6")
    fetch("https://api.cloudinary.com/v1_1/dx6obccn6/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(async data => {
        console.log(await data.url)
        setUrl(() => data.url)
      }).catch(err => {
        console.log(err)
      })
    console.log(url)
    if (true) {
      const info = {
        jobID: props.data.jobID,
        userID: user.user._id,
        url: 'http://res.cloudinary.com/dx6obccn6/video/upload/v1641878513/eplbzfml0xpp7zphgwue.mkv',
        name: user.user.name
      }
      console.log(info)
      axios.post('https://0876-111-68-99-41.ngrok.io/sentiment', { ...info }, { headers: { 'x-access-token': user.token } })
      .then(res => {
         console.log(res);
         setLoader(false);
         props.onClose();
        })
         .catch(err => {console.log(err);setLoader(false);props.onClose();})
      
    }
    // props.onClose();
  }
  return (
    <div className="RecordedScreenContainer">
      <div className="CameraContainer">
        <video
          ref={recordWebcam.webcamRef}
          className="Camera"
          style={{
            display: `${recordWebcam.status === CAMERA_STATUS.OPEN ||
              recordWebcam.status === CAMERA_STATUS.RECORDING
              ? "block"
              : "none"
              }`
          }}
          autoPlay
          muted
        />
        <div className="AltTextContainer" style={{ display: `${recordWebcam.status === CAMERA_STATUS.OPEN || recordWebcam.status === CAMERA_STATUS.RECORDING || recordWebcam.status === CAMERA_STATUS.PREVIEW ? "none" : "block"}` }}>
          <p className="AltText">Turn on your camera and start recording.</p>
        </div>
        <div className="AltTextContainer" style={{ display: `${recordWebcam.status === CAMERA_STATUS.PREVIEW ? "block" : "none"}` }}>
          <p className="AltText">Click on submit to leave session.</p>
        </div>
        <div className="CameraButtonContainer">
          <button
            disabled={recordWebcam.status === CAMERA_STATUS.OPEN || recordWebcam.status === CAMERA_STATUS.RECORDING || recordWebcam.status === CAMERA_STATUS.PREVIEW}
            style={recordWebcam.status === CAMERA_STATUS.OPEN || recordWebcam.status === CAMERA_STATUS.RECORDING ? { display: 'none' } : { font: '20px' }}
            className="CameraButtons"
            onClick={recordWebcam.open}
          >
            <Icon className="CamOnIcon" path={mdiVideo} size={1} />
          </button>
          <button
            disabled={recordWebcam.status === CAMERA_STATUS.CLOSED || recordWebcam.status === CAMERA_STATUS.PREVIEW}
            style={recordWebcam.status === CAMERA_STATUS.CLOSED || recordWebcam.status === CAMERA_STATUS.PREVIEW ? { display: 'none' } : { font: '20px' }}
            onClick={recordWebcam.close}
            className="CameraButtons"
          >
            <Icon className="CamOffIcon" path={mdiVideoOff} size={1} />
          </button>
          <button
            disabled={recordWebcam.status === CAMERA_STATUS.CLOSED || recordWebcam.status === CAMERA_STATUS.RECORDING || recordWebcam.status === CAMERA_STATUS.PREVIEW}
            onClick={() => { recordWebcam.start(); start() }}
            className="CameraButtons"
          >
            <Icon className="RecordOnIcon" path={mdiRecord} size={1} />

          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.RECORDING}
            onClick={recordWebcam.stop}
            className="CameraButtons"
          >
            <Icon className="RecordOffIcon" path={mdiCheckboxBlank} size={1} />
          </button>
          <button
            disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW}
            style={recordWebcam.status !== CAMERA_STATUS.PREVIEW ? { display: 'none' } : { font: '20px' }}
            onClick={recordWebcam.download}
            className="CameraButtons"
          >
            <Icon className="CamOnIcon" path={mdiDownload} size={1} />
          </button>
        </div>
      </div>
      <div className="QuestionContainer">
        {/* <div className="Question" >
                <h2>Question # 1</h2>
                <p style={{TextTransform:'capitalize'}}>What you want to achieve in your life and is you on the right path of achieveing that?</p>
              </div> */}
        {
          (props?.data?.questions).map((data, index) => {
            return (
              <div className="Question" key={index}>
                <h2>Question # {index + 1}</h2>
                <p style={{ TextTransform: 'capitalize' }}>{data}</p>
              </div>
            )
          })
        }

        <button disabled={recordWebcam.status !== CAMERA_STATUS.PREVIEW} style={recordWebcam.status !== CAMERA_STATUS.PREVIEW ? { background: 'transparent', border: '1px solid #e33434', color: '#e33434' } : { cursor: 'pointer' }} onClick={OnSubmit} className="RecoringSubmitButton">
          Submit
        </button>
      </div>
      <div className="timer" style={{ background: '#d1d1d1', width: '100%' }}>
        <span>{days}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {
                loader ?
                    <div className='loaderContainer'>
                        <ProgressSpinner />
                    </div>
                    :
                    ''
            }
    </div>
  );
};
