import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../../Components/Navbar';
import CompanySideBar from '../../Components/CompanySideBar';
import Password from '../../Components/PasswordFeild';
import Icon from '@mdi/react';
import { mdiCheckCircleOutline, mdiPencilOutline } from '@mdi/js';
import dp from '../../Logos/IAS-logo.png';
import UserContext from '../../Context/User';
import axios from 'axios';
import { useHistory } from 'react-router';
import PopUp from "../../Components/PopUp"
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import 'antd/dist/antd.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);



function CompanyProfile() {
    const { user, setUser } = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const History = useHistory();
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    const [values, setValues] = useState({
        password: "",
        NewPass: "",
        confirmPass: "",
    });
    const [files, setFiles] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [DisplayProfile, setDisplayProfile] = useState(false);
    const [DisplayUpdateProfile, setDisplayUpdateProfile] = useState(false);
    const [DisplayPasswordRecovery, setDisplayPasswordRecovery] = useState(false);
    const [lenghtCheck, setLengthCheck] = useState(false);
    const [numberCheck, setNumberCheck] = useState(false)
    const [UpperCaseCheck, setUpperCaseCheck] = useState(false)
    const [showError, setShowError] = useState(false);
    const [showMatchMeassage, setMatchMessage] = useState(false);
    const [disable, setDisable] = useState(true);
    const [details, setDetails] = useState('');
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
            History.push('./user-login')
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
        axios.get('https://iastestingapi.herokuapp.com/api/company/getProfile', { headers: { 'x-access-token': user.token } }
        ).then(async (res) => {
            setAddress(res.data[0].address);
            setDescription(res.data[0].description)
            setImage(res.data[0].logoImage);
        }).catch(async (err) => {
            console.log(err)
        })
    }
    const HandleUpdate = async () => {
        const userData = {
            company: user.user.name,
            description: description,
            address: address,
            logoImage: files[0].getFileEncodeBase64String(),

        }
        const Headers = {
            'x-access-token': user.token
        }

        if (user.user.profileSetup === false) {
            axios.post('https://iastestingapi.herokuapp.com/api/company/companyProfile',
                { ...userData },
                { headers: Headers }
            ).then(async (res) => {
                setShow(true)
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
            axios.put('https://iastestingapi.herokuapp.com/api/company/updateProfile',
                { ...userData },
                { headers: Headers }
            ).then(async (res) => {
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
        axios.put('https://iastestingapi.herokuapp.com/api/company/companyPasswordChange',
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
            <CompanySideBar />
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
                                    <p>{user.user.name}</p>
                                </div>
                                <div className="ApplicantInfoIconContainer" onClick={() => { setDisplayProfile(false); setDisplayUpdateProfile(true) }}>
                                    <Icon className='ApplicantInfoIcon' path={mdiPencilOutline} size={1} />
                                </div>
                            </div>
                            <div className="ProfileTitle"><p>{address}</p></div>
                            <div className="ProfileAbout"><p>{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`EditProfile ${DisplayUpdateProfile ? '' : 'hide'}`}>
                    <h1 className='ApplicantInfoHeader'>Company Information</h1>
                    <div className='FeildsWrap'>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Name</p>
                            <input className='inputfeild' type='text' value={user.user.name} disabled />
                        </div>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Title</p>
                            <input className='inputfeild' type='text' placeholder='e.g. WordPress Developer' required />
                        </div>
                    </div>
                    <div className='FeildsWrap'>
                        <div className='inputContainer'>
                            <p className='inputlabel'>Address</p>
                            <input className='inputfeild' type='text' onChange={(e) => setAddress(e.target.value)} placeholder='' required />
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

                    <div className="ButtonWrap">
                        {/* <div className='ProfileButton' style={{ background: 'lightgray', color: 'black' }}>Cancel</div> */}
                        <div className='ApplyButton' onClick={HandleUpdate}>Update</div>
                    </div>
                </div>
                <div className={`PasswordRecoveryContainer ${DisplayPasswordRecovery ? '' : 'hide'}`}>
                    <p className='ApplicantInfoHeader'>Recovery & notifications</p>
                    <p className='RecoveryText'>We recommend adding a linked email so you can recover your account if you lose your password.</p>
                    <div className='RecoverEmailWrap'>
                        <p>Email address</p>
                        <input type="email" placeholder='abc@xyz.com' />
                        <div onClick={() => { setShow(true); setMessage("Comming Soon") }}>Update</div>
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
                                <div className={` ChangePasswordButton ${disable ? 'disable' : ''}`} onClick={HandlePasswordChange}  >Update</div>
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
            <PopUp title={message} show={show} onClose={() => setShow(false)} >{details}</PopUp>
        </div>

    );
}
export default CompanyProfile;
