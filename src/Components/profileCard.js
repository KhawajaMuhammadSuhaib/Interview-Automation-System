import React, { useState } from 'react';
import Icon from '@mdi/react';
import '../StyleSheets/web.css';
import { mdiCheckCircleOutline, mdiPencilOutline, mdiTrashCanOutline, } from '@mdi/js';
import axios from 'axios';
function ProfileCard(props) {
    const close = () => {
        props.onClose()
    }
    return (
        <div className='ModalBackground' onClick={close}>
            <div className='JobCard' onClick={e => e.stopPropagation()}>
                    <div className='ProfileHeader'>
                        <div className='ProfileInfoContainer'>
                            <div className='InfoAndIconContainer'>
                                <div className="ProfileName">
                                    <p>Khawaja Muhammad Suhaib</p>
                                </div>
                                <div className="ApplicantInfoIconContainer">
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                </div>
                            </div>
                            <div className="ProfileTitle"><p>Mern Stack Developer</p></div>
                            <div className="ProfileAbout"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p></div>
                        </div>
                    </div>
                    <div className='ProfileBody'>
                        <div className="ApplicantInfoContainer">
                            <p className='ApplicantInfoHeader'>Education</p>
                            <div className='InfoAndIconContainer'>
                                <div className='ApplicantInfo'>
                                    <p className='PositionTitle'>Bachelor of Computer Science</p>
                                    <p className='OrganizationTitle'>COMSATS University Islamabad</p>
                                    <p className='ApplicantAchivments'>2.99/4.00</p>
                                    <p className='ApplicantAchivments'>01/2018 - Present</p>
                                </div>
                                <div className="ApplicantInfoIconContainer">
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                    <Icon className='ApplicantInfoIcon' path={mdiTrashCanOutline} size={1} />
                                </div>
                            </div>
                        </div>
                        <div className="ApplicantInfoContainer">
                            <p className='ApplicantInfoHeader'>Work Experience</p>
                            <div className='InfoAndIconContainer'>
                                <div className="ApplicantInfo">
                                    <p className='PositionTitle'>Front-End Developer</p>
                                    <p className='OrganizationTitle'>GS Technologies Limited</p>
                                    <p className='ApplicantAchivments'>07/2020 - 01/2021</p>
                                </div>
                                <div className="ApplicantInfoIconContainer">
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                    <Icon className='ApplicantInfoIcon' path={mdiTrashCanOutline} size={1} />
                                </div>
                            </div>
                            <div className='InfoAndIconContainer'>
                                <div className="ApplicantInfo">
                                    <p className='PositionTitle'>React Native Developer</p>
                                    <p className='OrganizationTitle'>Systems Limited</p>
                                    <p className='ApplicantAchivments'>07/2020 - Present</p>
                                </div>
                                <div className="ApplicantInfoIconContainer">
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                    <Icon className='ApplicantInfoIcon' path={mdiTrashCanOutline} size={1} />
                                </div>
                            </div>


                        </div>
                        <div className="ApplicantInfoContainer">
                            <p className='ApplicantInfoHeader'>Skills</p>
                            <div className='InfoAndIconContainer'>
                                <div className="ApplicantInfo">
                                    <ul className='SkillsWrap'>
                                        <li className='Skills'>
                                            HTML
                                            <div className="SkillIconContainer">&#215; </div>
                                        </li>
                                        <li className='Skills'>CSS<div className="SkillIconContainer">&#215; </div></li>
                                        <li className='Skills'>Javascript<div className="SkillIconContainer">&#215; </div></li>
                                        <li className='Skills'>React js<div className="SkillIconContainer">&#215; </div></li>
                                        <li className='Skills'>Mongodb<div className="SkillIconContainer">&#215; </div></li>
                                    </ul>
                                </div>
                                <div className="ApplicantInfoIconContainer">
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ProfileCard;