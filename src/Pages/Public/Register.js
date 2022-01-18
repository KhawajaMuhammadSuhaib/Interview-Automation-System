import React, { useState, useEffect } from 'react';
import { Radio } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';
import Icon from '@mdi/react';
import { mdiAccountOutline, mdiEmailOutline, mdiLockOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import logo from '../../Logos/RegisterLogo.svg'
import '../../StyleSheets/web.css';
import PopUp from '../../Components/PopUp';

function Register() {
    var pass = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    const [show, setShow] = useState(false);
    const [showIcon, setShowIcon] = useState(true)
    const [Popup, setPopUp] = useState({
        title: '',
        message: ''
    });
    const [disable, setDisable] = useState(true);
    const [validation, setValidation] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setuserType] = useState("");
    const [values, setValues] = useState({
        showPassword: false,
    });
    useEffect(() => {
        if (name !== "" && email !== "" && password !== "" && userType !== "") {
            setDisable(false);
        }
        else {
            setDisable(true)
        }
        if (password !== "" && password.length < 8) {
            setValidation(true)
            setDisable(true)
        }
        else {
            setValidation(false)
        }
        if (password !== "" && !password.match(pass)) {
            setValidation(true)
            setDisable(true)
        }
        else {
            setValidation(false)
        }
    }, [name, password, email, userType])


    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
        setShowIcon(!showIcon)
    }

    const HandleRegisteration = () => {
        const data = {
            name: name,
            email: email,
            password: password,
            userType: userType
        }
        console.log(data)
        axios.post('https://iastestingapi.herokuapp.com/api/signup', { ...data })
            .then(async (res)=> {
                await setPopUp({ ...Popup, title: "Verify your E-mail", message: 'An e-mail is sent to ' + email + '. Please verify your e-mail address to finish signing up. Thank you for choosing IAS.' })
            })
            .catch(async(err) => {
                console.log(err.response)
                if (err.response.status === 409) {
                  await setPopUp({ ...Popup, title: "E-mail already in use", message: 'This e-mail is already registered with other account please use a different e-mail.' })
                }
                else {
                    setPopUp({ ...Popup, title: 'Incorrect Cradentails', message: err.response.data })
                }
            })

        setShow(true);
    }

    return (
        <div className='grid-container'>
            <div className='col1'>
                <img src={logo} alt='Company Logo' width='600' height='600' />
            </div>
            <div className='col2'>
                <div className='register-form'>
                    <p className='heading'>Welcome to IAS</p>
                    <p className='subHeading'>Create Account</p>
                    <div className='inputWrap'>
                        <Icon path={mdiAccountOutline} size={1} />
                        <input className='input' type="text" name='name' onChange={(e) => { setName(e.target.value) }} placeholder='Name' />
                    </div>
                    <div className='inputWrap'>
                        <Icon path={mdiEmailOutline} size={1} />
                        <input className='input' type="email" name="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    </div>
                    <div className={`inputWrap ${validation ? 'showError' : ''}`}>
                        <Icon path={mdiLockOutline} size={1} />
                        <input className='input' type={values.showPassword ? 'text' : 'password'} name='password' onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />
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
                    <div className={`${validation ? 'passMatchError' : 'noError'}`}>
                        <p className='errorText'>Must contain a number, a upercase letter, a symbol</p>
                        <p className='errorText'>and must be 8 character long</p>

                    </div>
                    <div className='RadioButtonWrap'>
                        <Radio.Group defaultValue="" buttonStyle="solid"  >
                            <Radio.Button value="applicant" onChange={(e) => { setuserType(e.target.value); console.log(e.target.value) }} className='RadioButton'>Applicant</Radio.Button>
                            <Radio.Button value="company" onChange={(e) => { setuserType(e.target.value) }} className='RadioButton'>Company</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className={`submitButton ${disable ? 'disable' : ''}`} onClick={HandleRegisteration}>Create Account</div>
                    <div className='signInLink'>
                        <p>Already a member? <a href='user-login'>Sign in</a></p>
                    </div>
                </div>
            </div>
            <PopUp title={Popup.title} show={show} onClose={() => setShow(false)}>
                <p>{Popup.message}</p>
            </PopUp>
        </div>
    );
}

export default Register;