import React, { useState } from 'react';
import PopUp from '../Components/PopUp'
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import '../StyleSheets/web.css';
function UpdateJob(props) {
    const [show, setShow] = useState(false);
    const[succes,setSucces]=useState(false)
    if (!props.show) {
        return null;
    }
    const ModalClose = () => {
        setShow(false);
        props.Close();
    }
    const Success = () => {
        setSucces(false);
        props.Close();
    }



    return (
        <div>
            <div className='ModalBackground' onClick={props.Close}>
                <div className='CreateJobContainer' onClick={e => e.stopPropagation()}>
                    <p className='JobHeader'>Update Job</p>
                    <div className='JobInputContainer'>
                        <input className='JobInput' type='text' placeholder='Job Title' />
                        <input className='JobInput' type='text' placeholder='Job Location' />
                    </div>
                    <div className='JobInputContainer'>
                        <Dropdown
                            placeholder="Experience Level"
                            options={['Internship', 'Entry level', 'Mid-Senior level', "Director", "Executive"]}
                        />
                        <Dropdown
                            placeholder="Job Type"
                            options={['Full-time', 'Part-time', "Contract", 'Temporary', 'Internship']}
                        />
                    </div>
                    <div className='JobInputContainer'>
                        <Dropdown
                            placeholder="On-site/Remote"
                            options={['All', 'On-site', 'Remote', "Hybrid"]}
                        />
                        <Dropdown
                            placeholder="Salary Range"
                            options={['10K-15K Rs', '15K-20K Rs', '20K-30K Rs', "30K-40K Rs", "40K-50K Rs", "50K+ RS"]}
                        />
                    </div>

                    <div className='JobDetails'>
                        <p className='JobInputLabel'>Summary</p>
                        <textarea className='JobTextArea' cols='90' rows='8' />
                    </div>
                    <div className='JobDetails'>
                        <p className='JobInputLabel'>Requirements</p>
                        <textarea className='JobTextArea' cols='90' rows='8' />
                    </div>
                    <div className='CreatJobButtonWrap'>
                        <div className='ApplyButton' onClick={()=>setSucces(true)}>Update</div>
                        <div className='SaveButton' onClick={()=>setShow(true)}>Cancel</div>
                    </div>
                </div>
            </div>
            <PopUp title="Updated Successfully" show={succes} onClose={Success}></PopUp>
            <PopUp title="Discard Changes?" show={show} onClose={ModalClose}>
                Your changes won't be save.
            </PopUp>
        </div>
    )
}

export default UpdateJob;