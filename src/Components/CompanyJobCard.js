import React, { useState } from 'react';
import Icon from '@mdi/react';
import '../StyleSheets/web.css';
import ViewApplicants from './TotalApplicantsScreen';
import { mdiBriefcase, mdiMapMarker, mdiClose, mdiAccount } from '@mdi/js';
import axios from 'axios';
function CompanyJobCard(props) {
    const [applicants, setApplicants] = useState('')
    const [show, setShow] = useState(false);
    if (!props.show) {
        return null;
    }
    const close = () => {
        props.onClose()
    }
    const HandleApplicants = () => {
        axios.get('https://iastestingapi.herokuapp.com/api/company/particularJobAppliedUsers/' + props.job._id,
            { headers: { 'x-access-token': props.user.token } }
        ).then(async (res) => {
            console.log('View Applicant')
            console.log(res.data)
            setApplicants(res.data)
        }).catch(async (err) => {
            console.log(err)
        })
        setShow(true);

    }

    return (
        <div >
            <div className='ModalBackground' onClick={close}>
                <div className='JobCard' onClick={e => e.stopPropagation()}>
                    {/* <Icon className='JobShortDetailIcon' onClick={close} path={mdiClose} size={1} /> */}
                    <div className='JobInfoContainer'>
                        <div className='JobInfo'>
                            <p class='JobTitle'>{props.job.title}</p>
                            <p className='JobShortDetails'>{props.user.user.name}</p>
                            <p className='JobShortDetails'>{props.job.location}</p>
                            <p className='JobShortDetails'>{props.job.jobType}</p>
                            <p className='JobShortDetails'>{props.job.experience}</p>
                            {/* <p className='PublishTime'>{props.job.createdAt}</p> */}
                            <p className='PublishTime'></p>
                            <div className='ApplicantButton' onClick={HandleApplicants}>
                                <Icon className='ApplicantButtonIcon' path={mdiAccount} size={1} />
                                <p className='ApplicantButtonText'>View Applicants</p>
                            </div>
                        </div>
                    </div>
                    <div className='JobDetailsContainer'>
                        <div className='JobDetailsWrap'>
                            <p className='JobDetailHeader'>Summary:</p>
                            <p className='JobDetailText'>{props.job.description}</p>
                        </div>
                        <div className='JobDetailsWrap'>
                            <p className='JobDetailHeader'>Requirements:</p>
                            <p className='JobDetailText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                        </div>
                    </div>
                </div>
            </div>
            <ViewApplicants show={show} onClose={() => setShow(false)} data={applicants} user={props.user} job={props.job} />
        </div>
    )
}

export default CompanyJobCard;