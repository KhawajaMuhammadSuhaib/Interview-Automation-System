import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { useParams } from 'react-router-dom';
import { mdiLockOutline, mdiCheckCircleOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import logo from '../../Logos/ChangePasswordLogo.svg';
import '../../StyleSheets/web.css';
import PopUp from '../../Components/PopUp';
import axios from 'axios';
import Password from 'antd/lib/input/Password';
import { useHistory } from 'react-router';


function ChangePassword() {
    const { token } = useParams()
    const History = useHistory();
    const [show, setShow] = useState(false);
    const [showMatchMeassage, setMatchMessage] = useState(false);
    const [showError, setShowError] = useState(false);
    const [disable, setDisable] = useState(true);
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    const [values, setValues] = useState({
        NewPass: "",
        confirmPass: "",
    });
    const [showIcon, setShowIcon] = useState(true);
    const[showICon2,setShowIcon2]=useState(true)
    const [lenghtCheck, setLengthCheck] = useState(false);
    const [numberCheck, setNumberCheck] = useState(false)
    const [UpperCaseCheck, setUpperCaseCheck] = useState(false)
    const SetNewPassword = (event) => {
        setValues({ ...values, NewPass: event.target.value });
    }
    const SetConfirmPassword = (event) => {
        setValues({ ...values, confirmPass: event.target.value })
    }
    const [data, setData] = useState({
        showPassword: false,
        showConfirmPsssword: false,
    });
    const handleShowPassword = () => {
        setData({ ...data, showPassword: !data.showPassword })
        setShowIcon(!showIcon)
    }
    const handleConfirmShowPassword = () => {
        setData({ ...data, showConfirmPsssword: !data.showConfirmPsssword })
        setShowIcon2(!showICon2)
    }

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

    const OnSubmission = () => {
        setShow(true);
        const data={
            newPassword:values.NewPass
        }

        axios.put('https://iastestingapi.herokuapp.com/api/resetPassword',
            {
                ...data
            }
            , {
                headers: {
                    'x-reset-token': token
                }
            }).then(res => {
                History.push('/user-login')
            })
    }
    return (
        <div className='grid-container'>
            <div className='col1'>
                <img src={logo} alt='Company Logo' width='600' height='600' />
            </div>
            <div className='col2'>
                <div className='register-form'>
                    <p className='heading'>Trouble signing in?</p>
                    <p className='subHeading'>Reset Password</p>
                    <div className='inputWrap'>
                        <Icon path={mdiLockOutline} size={1} />
                        <input className='input' type={data.showPassword ? 'text' : 'password'} value={values.NewPass} onChange={SetNewPassword} placeholder='New Password' />
                        {
                            showIcon ?
                                <Icon path={mdiEyeOffOutline}
                                    size={1}
                                    style={{ color: 'gray' }}
                                    onClick={handleShowPassword}
                                />
                                : <Icon
                                    path={mdiEyeOutline}
                                    size={1}
                                    style={{ color: 'gray' }}
                                    onClick={handleShowPassword}
                                />
                        }
                    </div>
                    <div className={`inputWrap ${showError ? 'showError' : ''}`}>
                        <Icon path={mdiLockOutline} size={1} className={` ${showError ? 'showError' : ''}`} />
                        <input className='input' type={data.showConfirmPsssword ? 'text' : 'password'} value={values.confirmPass} onChange={SetConfirmPassword} placeholder='Confirm Password' />
                        {
                            showICon2 ?
                                <Icon path={mdiEyeOffOutline}
                                    size={1}
                                    style={{ color: 'gray' }}
                                    onClick={handleConfirmShowPassword}
                                />
                                : <Icon
                                    path={mdiEyeOutline}
                                    size={1}
                                    style={{ color: 'gray' }}
                                    onClick={handleConfirmShowPassword}
                                />
                        }
                    </div>
                    <div className={`${showError ? 'passMatchError' : 'noError'}`}>
                        <p className='errorText'>Please make sure your passwords match.</p>
                    </div>
                    <div className={`${showMatchMeassage ? 'passMatchNoError' : 'noError'}`}>
                        <p className='NoErrorText'>Passwords Match</p>
                    </div>
                    <div className='GuideContainer' style={{ width: '90%' }}>
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
                    <div className={`submitButton ${disable ? 'disable' : ''}`} onClick={OnSubmission}  >Change Password</div>
                </div>
            </div>
            <PopUp title='Password Reset Successfully' show={show} onClose={() => setShow(false)}>
                <p> Log in to continue. Thank you foe choosing IAS. </p>
            </PopUp>
        </div>
    );
}

export default ChangePassword;