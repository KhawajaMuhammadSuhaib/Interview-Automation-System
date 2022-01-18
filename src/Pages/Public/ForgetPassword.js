import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Icon from '@mdi/react';
import { mdiAccountOutline } from '@mdi/js';
import logo from '../../Logos/ForgetLogo.svg';
import '../../StyleSheets/web.css';
import PopUp from '../../Components/PopUp';

function ForgetPassword() {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState('');
    const [disable, setDisable] = useState(true);
    useEffect(() => {
        if (email !== "") {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }, [email])
    const HandleSubmission = () => {
        const data = {
            email: email,
        }
        axios.post("https://iastestingapi.herokuapp.com/api/forgotPassword", { ...data })
            .then(res => {
                console.log(res);
                setShow(true)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div class='grid-container'>
            <div class='col1'>
                <img class src={logo} alt='Company Logo' width='600' height='600' />
            </div>
            <div class='col2'>
                <div class='register-form'>
                    <p className='heading'>Trouble signing in?</p>
                    <p className='subHeading'>Reset Password</p>
                    <div className='inputWrap'>
                        <Icon path={mdiAccountOutline} size={1} />
                        <input className='input' type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    </div>
                    <div className={`submitButton ${disable ? 'disable' : ''}`} onClick={HandleSubmission}>Reset Password</div>
                    <div className='signInLink'>
                        <p>Already a member? <a href='user-login'>Sign in</a></p>
                    </div>
                </div>
            </div>
            <PopUp title='Password Reset E-mail Sent' show={show} onClose={() => setShow(false)}>
                <p>An email has been sent to your email address <b>{email}</b>. Follow the directions in email to reset your password. </p>
            </PopUp>
        </div>
    );
}

export default ForgetPassword;