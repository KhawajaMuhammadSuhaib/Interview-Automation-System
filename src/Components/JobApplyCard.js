import React from 'react';
import { useState } from 'react';
import PopUp from './PopUp';
import { MyJobs } from './MyJobs';

function JobApplyCard(Props) {
    const [show, setShow] = useState(false)
    if (!Props.show) {
        return null;
    }
    const ModalClose = () => {
        setShow(false);
        Props.onClose();
    }

    return (
        <div  >
            <div className='JobApplyModal' onClick={Props.onClose}>
                <div className='ApplyCardContainer' onClick={e => e.stopPropagation()}>
                    <button className="close" onClick={Props.onClose}>
                        &times;
                    </button>
                    <p className='ApplyCardHeader'>Apply to {Props.data.Company}</p>
                    <div className='ApplyJobInputContainer'>
                        <p className='SubHeading'>Name*</p>
                        <input className='JobCardInput' type='text' required />
                    </div>
                    <div className='ApplyJobInputContainer'>
                        <p className='SubHeading'>Email Address*</p>
                        <input className='JobCardInput' type='email' required />
                    </div>
                    <div className='ApplyJobInputContainer'>
                        <p className='SubHeading'>Mobile phone number*</p>
                        <input className='JobCardInput' type='text' required />
                    </div>
                    <div className='ResumeContainer'>
                        <p className='SubHeading'>Resume</p>
                        <p className='SubHeading2'>Be sure  to include an updated resume*</p>
                        <div>

                        </div>
                        <div>
                            <input type='file' />
                        </div>
                        <div className="ApplyButtonContainer">
                            <div className='ApplyButton' 
                            onClick={() => {
                                Props.Applied(true);
                                Props.onClose();
                                MyJobs.push(Props.data)
                                console.log(MyJobs)
                            }}>Apply
                            </div>
                            <div className='SaveButton' onClick={() => setShow(true)}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
            <PopUp title="Discard application?" show={show} onClose={ModalClose}>
                Your changes won’t be saved if you close this application before submitting.
            </PopUp>
        </div>


    );
}

export default JobApplyCard;