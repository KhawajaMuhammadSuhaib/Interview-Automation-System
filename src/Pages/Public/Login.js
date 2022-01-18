import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios'
import Icon from '@mdi/react';
import { mdiAccountOutline, mdiLockOutline, mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js';
import logo from '../../Logos/LoginLogo.svg';
import '../../StyleSheets/web.css';
import jwt from 'jsonwebtoken'
import UserContext from '../../Context/User';
import { storeToken } from '../../Cache/User'

function Login() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState(false)
    const [showIcon, setShowIcon] = useState(true)
    const [disable, setDisable] = useState(true);
    const History=useHistory();
    useEffect(() => {
        if (email !== "" && password !== "") {
            setDisable(false);
        }
        else {
            setDisable(true);
        }
    }, [email, password])

    const [values, setValues] = useState({
        showPassword: false,
    });
    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
        setShowIcon(!showIcon)
    }
    const HandleLogin = () => {
        const data = {
            email: email,
            password: password
        }
        axios.post("https://iastestingapi.herokuapp.com/api/login", { ...data })
            .then(async (res) => {
                console.log((res))
                const data = jwt.decode(res.data.token);
                setUser(res.data);
                storeToken(data);
                setValidation(false);
                if(res.data.user.userType==='applicant'){
                    History.push('/ApplicantProfile')
                }
                else if(res.data.user.userType==="company"){
                    History.push('/CompanyProfile')
                }

            })
            .catch(async(err) => {
                console.log(err.response)
                if (err.response.status === 403 || err.response.status === 404) {
                    setValidation(true)
                }
            })
    }
    return (
        <div class='grid-container'>
            <div class='col1'>
                <img class src={logo} alt='Company Logo' width='600' height='600' />
            </div>
            <div class='col2'>
                <div class='register-form'>
                    <p className='heading'>Welcome to IAS</p>
                    <p className='subHeading'>Log In</p>
                    <div className='inputWrap'>
                        <Icon path={mdiAccountOutline} size={1} />
                        <input className='input' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    </div>
                    <div className='inputWrap'>
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
                        <p className='errorText'>Incorrect email or password</p>
                    </div>
                    <div className={`submitButton ${disable ? 'disable' : ''}`} onClick={HandleLogin}>Log In</div>
                    <div className='signInLink'>
                        <p><a href='ForgetPassword'>Forget Password?</a></p>
                        <p>Not a member? <a href='Register'>Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;