import React, { useState } from 'react';
import Icon from '@mdi/react';
import '../StyleSheets/web.css';
import JobApplyCard from './JobApplyCard';
import { mdiBriefcase, mdiMapMarker, mdiClose, mdiCheckCircleOutline } from '@mdi/js';
function JobCard(props) {
    const [show, setShow] = useState(false);
    if (!props.show) {
        return null;
    }
    const close = () => {
        props.onClose()
        props.SetApply(false)
    }

    return (
        <div >
            <div className='ModalBackground' onClick={close}>
                <div className='JobCard' onClick={e => e.stopPropagation()}>
                    {/* <Icon className='JobShortDetailIcon' onClick={close} path={mdiClose} size={1} /> */}
                    <div className='JobInfoContainer'>
                        {/* <div className='JobInfoPicWrap'>
                            {props.Data.Pic}
                        </div> */}
                        <div className='JobInfo'>
                            <p class='JobTitle'>{props.Data.title}</p>
                            <p className='JobShortDetails'>{props.Data.Company}</p>
                            <p className='JobShortDetails'>{props.Data.Location}</p>
                            <p className='JobShortDetails'>Full-time</p>
                            <p className='JobShortDetails'>Mid-Senior Level</p>
                            <p className='PublishTime'>{props.Data.Time}</p>
                            {props.Apply ?
                                <div className='JobShortDetailsWrap'>
                                    <Icon className='applied' path={mdiCheckCircleOutline} size={1} />
                                    <p className='applied'>Applied</p>
                                </div>
                                :
                                <div className='ActionButtonWrap'>
                                    <div className='ApplyButton' onClick={() => setShow(true)}>Apply</div>
                                    <div className='SaveButton'>Save</div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='JobDetailsContainer'>
                        <div className='JobDetailsWrap'>
                            <p className='JobDetailHeader'>Summary:</p>
                            <p className='JobDetailText'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
            <JobApplyCard show={show} data={props.Data} onClose={() => setShow(false)} Applied={props.SetApply} />
        </div>
    )
}

export default JobCard;