import React, { useState } from 'react';
import PopUp from '../Components/PopUp'
import { Dropdown } from 'react-dropdown-now';
import 'react-dropdown-now/style.css';
import '../StyleSheets/web.css';
import axios from 'axios';

function AddJobCard(props) {
    const [show, setShow] = useState(false);
    const[succes,setSucces]=useState(false);
    const[title,setTitle]=useState('')
    const[location,setLocation]=useState('');
    const[type,setType]=useState('')
    const[salary,setSalary]=useState('')
    const[experience,setExperience]=useState('')
    const[position,setPosition]=useState('')
    const[summary,setSummary]=useState('')
    const[requirements,setRequirements]=useState('')
    const[message,setMessage]=useState('');
    const[detail,setDetail]=useState('')
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
    const HandlePosting=()=>{
        setSucces(true)
        const data={
            title:title,
            location:location,
            experience:experience,
            jobType:type,
            salary:salary,
            skills:["react"],
            // position:position,
            // requirements:requirements,
            description:summary
        }
        axios.post('https://iastestingapi.herokuapp.com/api/company/postJob',
        {...data},
        {headers:{'x-access-token':props.user.token }}
        ).then(async(res)=>{
            console.log(res)
            setMessage('Job created successfully');
            setSucces(true)
        })
        .catch(async(err)=>{
            setMessage('You are not subscribed');
            setDetail('To post a job you must buy a subscription plan.')
            setSucces(true)
        })
    }
    return (
        <div>
            <div className='ModalBackground' onClick={props.Close}>
                <div className='CreateJobContainer' onClick={e => e.stopPropagation()}>
                    <p className='JobHeader'>Create Job</p>
                    <div className='JobInputContainer'>
                        <input className='JobInput' type='text' placeholder='Job Title' onChange={(e)=>setTitle(e.target.value)} />
                        <input className='JobInput' type='text' placeholder='Job Location' onChange={(e)=>setLocation(e.target.value)} />
                    </div>
                    <div className='JobInputContainer'>
                        <Dropdown
                        onChange={(e)=>setExperience(e.value)}
                            placeholder="Experience Level"
                            options={['Internship', 'Entry level', 'Mid-Senior level', "Director", "Executive"]}
                        />
                        <Dropdown
                        onChange={(e)=>setType(e.value)}
                            placeholder="Job Type"
                            options={['Full-time', 'Part-time', "Contract", 'Temporary', 'Internship']}
                        />
                    </div>
                    <div className='JobInputContainer'>
                        <Dropdown
                        onChange={(e)=>setPosition(e.value)}
                            placeholder="On-site/Remote"
                            options={[ 'On-site', 'Remote', "Hybrid"]}
                        />
                        <Dropdown
                        onChange={(e)=>setSalary(e.value)}
                            placeholder="Salary Range"
                            options={['10K-15K Rs', '15K-20K Rs', '20K-30K Rs', "30K-40K Rs", "40K-50K Rs", "50K+ RS"]}
                        />
                    </div>
                    <div className='JobDetails'>
                        <p className='JobInputLabel'>Summary</p>
                        
                        <textarea className='JobTextArea' cols='90' rows='8'  onChange={(e)=>setSummary(e.target.value)} />
                    </div>
                    <div className='JobDetails'>
                        <p className='JobInputLabel'>Requirements</p>
                        <textarea className='JobTextArea' cols='90' rows='8' onChange={(e)=>setRequirements(e.target.value)}/>
                    </div>
                    <div className='CreatJobButtonWrap'>
                        <div className='ApplyButton' onClick={HandlePosting}>Post</div>
                        <div className='SaveButton' onClick={()=>setShow(true)}>Cancel</div>
                    </div>
                </div>
            </div>
            <PopUp title={message} show={succes} onClose={Success}>{detail}</PopUp>
            <PopUp title="Discard Changes?" show={show} onClose={ModalClose}>
                Your changes won't be save.
            </PopUp>
        </div>
    )
}

export default AddJobCard;

