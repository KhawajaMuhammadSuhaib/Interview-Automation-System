import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function InterviewReport(props) {
    const data = props.data;
    const [modalData, setModalData] = useState(null)
    const [position, setPosition] = useState('center');
    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }
    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }
    const ViewDetails = (data) => {
        onClick('displayBasic')
        console.log(data)
        setModalData(data)
    }
    return (
        <div>
            <div >
                <Icon className='backIcon' path={mdiArrowLeft} size={1} onClick={props.onClose} />
            </div>
            <div>
                <p className='UnderLineHeader'>Interview Report</p>
                <div className='JobTableHeaderRow spacing'>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Name</div>
                    <div className='JobTableHeader'>Email</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>Options</div>
                </div>

                {
                    data !== '' ?
                        <>
                            {
                                data.map((data, index) => {
                                    return (
                                        <div className='JobTableDataRow spacing' key={index}>
                                            <div className='JobTableColumn'>{index + 1}</div>
                                            <div className='JobTableColumn Title' >{data?.userID?.name}</div>
                                            <div className='JobTableColumn'>{data?.userID?.email}</div>
                                            <div className='JobTableColumn link' style={{ border: 'none', color: '#40A9FF' }} onClick={() => ViewDetails(data)}>View</div>
                                        </div>
                                    )
                                })
                            }
                        </>
                        :
                        <div className='Center'>
                            <p>No Report Yet.</p>
                        </div>
                }

            </div>
            <Dialog header="Interview Report" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                {/* <h1>Name: </h1>
                    <p> Suhaib Khawaja</p>
                    <h2> Email : </h2>
                    <p>Suhaibkhawaja2000@gmail.com</p> */}
                <h2 className='UnderLineHeader'>Text & Video Analysis</h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Text?.Confidence} maxValue={100} text={modalData?.recordedResult[0]?.Text?.Confidence + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>Tone Confidence</p>
                    </div>
                    <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Text?.Tone.happy} maxValue={100} text={modalData?.recordedResult[0]?.Text?.Tone.happy + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>Happiness</p>
                    </div>
                    <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Text?.Tone.calm} maxValue={100} text={modalData?.recordedResult[0]?.Text?.Tone.calm + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>Calmness</p>
                    </div>
                    <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Text?.Sentiment.Neutral} maxValue={100} text={modalData?.recordedResult[0]?.Text?.Sentiment.Neutral + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>Accuracy</p>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Text?.Emotion.ANNOYANCE} maxValue={100} text={modalData?.recordedResult[0]?.Text?.Emotion.ANNOYANCE + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>ANNOYANCE</p>
                    </div>
                    <div style={{ width: 120, height: 120, textAlign: 'center', margin: '20px' }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                strokeLinecap: 'butt',
                                textSize: '12px',
                                pathTransitionDuration: 0.5,
                                // pathColor: 'lightgreen',
                                textColor: '#000000',
                            })}
                            value={modalData?.recordedResult[0]?.Video?.confident} maxValue={100} text={modalData?.recordedResult[0]?.Video?.confident + '%'} />
                        <p style={{ fontWeight: 'bold', fontSize: '14px', textAlign: 'centers' }}>Fical Confidence</p>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}