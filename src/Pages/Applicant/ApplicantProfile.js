import React, { useState, useEffect, useContext } from 'react';
import { DatePicker, Space } from 'antd';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiPencilOutline, mdiTrashCanOutline, } from '@mdi/js';
import ApplicantSideBar from '../../Components/ApplicantSideBar';
import Password from '../../Components/PasswordFeild';
import dp from '../../Logos/dp.jpeg'
import NavBar from '../../Components/Navbar';
import UserContext from '../../Context/User';
import axios from 'axios';
import { useHistory } from 'react-router';
import PopUp from "../../Components/PopUp"
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import 'antd/dist/antd.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

function ApplicantProfile() {
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    const { RangePicker } = DatePicker;
    const [values, setValues] = useState({
        password: "",
        NewPass: "",
        confirmPass: "",
    });
    const [DisplayProfile, setDisplayProfile] = useState(true);
    const [DisplayUpdateProfile, setDisplayUpdateProfile] = useState(false);
    const [DisplayPasswordRecovery, setDisplayPasswordRecovery] = useState(false);
    const [lenghtCheck, setLengthCheck] = useState(false);
    const [numberCheck, setNumberCheck] = useState(false)
    const [UpperCaseCheck, setUpperCaseCheck] = useState(false)
    const [showError, setShowError] = useState(false);
    const [showMatchMeassage, setMatchMessage] = useState(false);
    const [disable, setDisable] = useState(true);
    const History = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const [details, setDetails] = useState('');
    const [title, settitle] = useState('')
    const [MobNo, setMobNo] = useState('')
    const [Address, setAddress] = useState('')
    const [DOB, setDOB] = useState('')
    const [Gender, setGender] = useState('male')
    const [Description, setDescription] = useState('')
    const [education, setEducation] = useState({
        degree: '',
        instititue: '',
        totalGrades: '',
        obtainGrades: ''
    })
    const [experience, setExperience] = useState({
        company: '',
        jobTitle: '',
        time: '',
    })
    const Skills=[];
    const Education=[];
    const Experience=[];

    const[skillValue,setSkillValue]=useState('')
    const [files, setFiles] = useState('')
    const [resume,setResume]=useState('')


    const SetPassword = (event) => {
        setValues({ ...values, password: event.target.value })
    }
    const SetNewPassword = (event) => {
        setValues({ ...values, NewPass: event.target.value });
    }
    const SetConfirmPassword = (event) => {
        setValues({ ...values, confirmPass: event.target.value })
    }


    useEffect(() => {
        if (user === '') {
            // History.push('./user-login')
        }
        else if (user.user.profileSetup === false) {
            setDisplayProfile(false);
            setDisplayUpdateProfile(true);
            setDisplayPasswordRecovery(false);
        }
        else {
            setDisplayProfile(true);
            setDisplayUpdateProfile(false);
            setDisplayPasswordRecovery(false);
            ShowProfile();
        }
    }, [History, user])
    useEffect(() => {
        if (values.NewPass !== values.confirmPass) {
            setShowError(true);
            setDisable(true)
        }
        else if (values.NewPass !== '' && values.confirmPass !== "") {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
        if (values.confirmPass === "" || values.NewPass === values.confirmPass) {
            setShowError(false)
        }
        if (values.NewPass !== "" && values.NewPass === values.confirmPass) {
            setMatchMessage(true)
        }
        else {
            setMatchMessage(false)
        }
        if (values.NewPass.length >= 8) {
            setLengthCheck(true);
        }
        else {
            setLengthCheck(false);

        }
        if (values.NewPass.match(upperCaseLetters)) {
            setUpperCaseCheck(true)
        }
        else {
            setUpperCaseCheck(false)
        }
        if (values.NewPass.match(numbers)) {
            setNumberCheck(true)
        }
        else {
            setNumberCheck(false)
        }

    }, [values.confirmPass, values.NewPass]);

    const ShowProfile = () => {
        axios.get('https://iastestingapi.herokuapp.com/api/applicant/getApplicantProfile', { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
                
        }).catch(async (err) => {
            console.log(err)
        })
    }

    const HandleUpdate = async () => {
        const userData = {
            title: title,
            address: Address,
            gender: Gender,
            DOB: DOB,
            mobileNo: MobNo,
            description: Description,
            education:Education,
            experience:Experience,
            skills:Skills,
            socialProfiles:[],
            profileImage:'sdads',
            resume:'dasd'
        }
        console.log(userData)
        const Headers = {
            'x-access-token': user.token
        }

        if (user.user.profileSetup === false) {
            axios.post('https://iastestingapi.herokuapp.com/api/applicant/applicantProfile',
                { ...userData },
                { headers: Headers }
            ).then(async (res) => {
                console.log(userData)
                await setShow(true)
                setMessage('Profile Set up Successfully');
                setDisplayProfile(true);
                setDisplayPasswordRecovery(false);
                setDisplayUpdateProfile(false);
            })
                .catch(async (err) => {
                    console.log("setup" + err)
                })
        }
        if (user.user.profileSetup === true) {
            axios.put('https://iastestingapi.herokuapp.com/api/applicant/updateProfile',
                { ...userData },
                { headers: Headers }
            ).then(async (res) => {
                console.log(userData)
                setShow(true)
                setMessage('Profile updated Successfully');
                setDisplayProfile(true);
                setDisplayPasswordRecovery(false);
                setDisplayUpdateProfile(false);
            })
                .catch(async (err) => {
                    console.log("update" + err)
                })
        }
    }
    const HandlePasswordChange = () => {
        const data = {
            oldPassword: values.password,
            newPassword: values.NewPass
        }
        const Headers = {
            'x-access-token': user.token
        }
        axios.put('https://iastestingapi.herokuapp.com/api/applicant/applicantPasswordChange',
            { ...data },
            { headers: Headers }
        ).then((res) => {
            setShow(true)
            setMessage("Success")
            setDetails("Password Changed successfully. E-mail is sent to registered e-mail.")
            SetNewPassword('')
        }).catch((err) => {
            setShow(true)
            setMessage("Failed")
            setDetails("Password change process fails. Current password incorrect")
        })

    }
    return (
        <div>
            <ApplicantSideBar />
            <NavBar />
            <div className='ProfilePage'>
                <div className={`ProfileCardContainer ${DisplayProfile ? '' : 'hide'}`} >
                    <div className='ProfileHeader'>
                        <div className='ProfilePicContainer'>
                            <img className='ProfilePic' src={dp} alt='ProfilePicture' width='180' height='180' />
                        </div>
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
                <div className={`EditProfile ${DisplayUpdateProfile ? '' : 'hide'}`} >
                    <h1 className='ApplicantInfoHeader'>Personal Information</h1>

                    <div className='FeildsWrap'>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Name</p>
                            <input className='inputfeild' type='text' disabled />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Title</p>
                            <input className='inputfeild' type='text' onChange={(e) => settitle(e.target.value)} placeholder='e.g. WordPress Developer' required />
                        </div>
                    </div>
                    <div className='FeildsWrap'>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Mobile No.</p>
                            <input className='inputfeild' onChange={(e) => setMobNo(e.target.value)} type='number' placeholder='92xxxxxxxxxx' required />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Address</p>
                            <input className='inputfeild' onChange={(e) => setAddress(e.target.value)} type='text' placeholder='' required />
                        </div>
                    </div>
                    <div className='FeildsWrap'>
                        <div className='inputContainer'>
                            <p className='inputlabel'>DOB</p>
                            <input type="date" className='inputfeild' onChange={(e) => setDOB(e.target.value)} />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Gender</p>
                            <select name="gender" id="gender" className='inputfeild' onChange={(e) => { setGender(e.target.value) }}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='inputContainer'>
                        <p className='inputlabel'>Description</p>
                        <textarea className='textarea' rows='5' cols='100' onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='ImageContainer'>
                        <p className='inputlabel'>Profile image</p>
                        <FilePond
                            files={files}
                            allowMultiple={false}
                            onupdatefiles={setFiles}
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>


                    <p className='ApplicantInfoHeader'>Education</p>

                    <div className="FeildsWrap">
                        <div className='inputContainer'>
                            <p className='inputlabel'>Institute</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setEducation({ ...Education, instititue: e.target.value }) }} />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Degree Title</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setEducation({ ...Education, degree: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="FeildsWrap">
                        <div className='inputContainer'>
                            <p className='inputlabel'>Total Grades</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setEducation({ ...Education, totalGrades: e.target.value }) }} />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Obtain Grades</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setEducation({ ...Education, obtainGrades: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="FeildsWrap">
                        <div className='inputContainer'>
                            <Space direction="vertical" style={{ width: '48.5%' }} >
                                <RangePicker picker="year" className='inputfeild' />
                            </Space>
                        </div>

                    </div>
                    <div className='ApplyButton' onClick={()=>Education.push(education)}>Save</div>

                    <p className='ApplicantInfoHeader'>Experience</p>

                    <div className="FeildsWrap">
                        <div className='inputContainer'>
                            <p className='inputlabel'>Company</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setExperience({ ...Experience, company: e.target.value }) }} />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Job Title</p>
                            <input className='inputfeild' type='text' onChange={(e) => { setExperience({ ...Experience, jobTitle: e.target.value }) }} />
                        </div>

                    </div>
                    <div className="FeildsWrap">
                        <div className='inputContainer'>
                            <Space direction="vertical" style={{ width: '48.5%' }} onChange={(e) => { setExperience({ ...Experience, time: e.target.value }) }}>
                                <RangePicker className='inputfeild' />
                            </Space>
                        </div>
                    </div>
                    <div className='ApplyButton' onClick={()=>Education.push(education)}>Save</div>


                    <h1 className='ApplicantInfoHeader'>Skills</h1>
                    <div className='inputContainer' style={{ width: '98%' }}>
                        <p className='inputlabel'>Skills</p>
                        <input className='inputfeild' type='text' onChange={(e)=>{setSkillValue(e)}} />
                        <div className='ApplyButton' onClick={()=>{Skills.push(skillValue);console.log(Skills)}}>Save</div>
                    </div>
                    {/* <h1>Social Profiles</h1> */}
                    <p className='ApplicantInfoHeader'>Resume/CV</p>
                    <div className='ImageContainer'>
                        <p className='inputlabel'>Upload Resume</p>
                        <FilePond
                            files={resume}
                            allowMultiple={false}
                            onupdatefiles={setFiles}
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>

                    <div className="ButtonWrap">
                        <div className='ApplyButton' onClick={HandleUpdate}>Update</div>
                    </div>
                </div>
                <div className={`PasswordRecoveryContainer ${DisplayPasswordRecovery ? '' : 'hide'}`}>
                    <p className='ApplicantInfoHeader'>Recovery & notifications</p>
                    <p className='RecoveryText'>We recommend adding a linked email so you can recover your account if you lose your password.</p>
                    <div className='RecoverEmailWrap'>
                        <p>Email address</p>
                        <input type="email" placeholder='abc@xyz.com' />
                        <div >Update</div>
                    </div>
                    <p className='ApplicantInfoHeader'>Change password</p>
                    <p className='RecoveryText'>We recommend you choose a strong password consist of a combination of uppercase and lowercase letters, numbers and special symbols.</p>
                    <div className='PasswordAndGuideContainer'>
                        <div className='ChangePasswordContainer'>
                            <Password placeholder='Current Password' value={values.password} onChange={SetPassword} />
                            <Password placeholder='New Password' value={values.NewPass} onChange={SetNewPassword} />
                            <Password placeholder='Confirm Password' value={values.confirmPass} onChange={SetConfirmPassword} />
                            <div className={`${showError ? 'passMatchError' : 'noError'}`}>
                                <p className='errorText'>Please make sure your passwords match.</p>
                            </div>
                            <div className={`${showMatchMeassage ? 'passMatchNoError' : 'noError'}`}>
                                <p className='NoErrorText'>Passwords Match</p>
                            </div>

                            <div className='ChangePasswordButtonWrap'>
                                <div className={` ChangePasswordButton ${disable ? 'disable' : ''}`} onClick={HandlePasswordChange} >Update</div>
                            </div>
                        </div>
                        <div className='GuideContainer'>
                            <div className='PasswordGuide'>
                                <div className='PasswordGuideWrap'>
                                    <Icon className={`PasswordGuideIcon ${UpperCaseCheck ? 'success' : ''}`} path={mdiCheckCircleOutline} size={1} />
                                    <p className={`PasswordGuideText ${UpperCaseCheck ? 'success' : ''}`}>Must contain one uppercase letter.</p>
                                </div>
                                <div className='PasswordGuideWrap'>
                                    <Icon className={`PasswordGuideIcon ${numberCheck ? 'success' : ''}`} path={mdiCheckCircleOutline} size={1} />
                                    <p className={`PasswordGuideText ${numberCheck ? 'success' : ''}`}>Must contain a number.</p>
                                </div>
                                <div className='PasswordGuideWrap'>
                                    <Icon className={`PasswordGuideIcon ${lenghtCheck ? 'success' : ''}`} path={mdiCheckCircleOutline} size={1} />
                                    <p className={`PasswordGuideText ${lenghtCheck ? 'success' : ''}`}>Must be 8 character long.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='ProfileNavigateMenuWrap' >
                    <div className="ProfileNavigateMenu">
                        <p className={`ProfileNavigateButton ${DisplayProfile ? 'active' : ''}`} onClick={() => { setDisplayProfile(true); setDisplayPasswordRecovery(false); setDisplayUpdateProfile(false) }}>Profile</p>
                        <p className={`ProfileNavigateButton ${DisplayUpdateProfile ? 'active' : ''}`} onClick={() => { setDisplayProfile(false); setDisplayPasswordRecovery(false); setDisplayUpdateProfile(true) }}>Update Profile</p>
                        <p className={`ProfileNavigateButton ${DisplayPasswordRecovery ? 'active' : ''}`} onClick={() => { setDisplayProfile(false); setDisplayPasswordRecovery(true); setDisplayUpdateProfile(false) }}>Passwords & recovery</p>
                    </div>
                </div>
            </div>
            <PopUp title={message} show={show} onClose={() => setShow(false)} >

            </PopUp>
        </div>

    );
}
export default ApplicantProfile;