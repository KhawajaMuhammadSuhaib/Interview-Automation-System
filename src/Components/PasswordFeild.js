import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiLockOutline, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js';
function Password(props) {
    const [showIcon, setShowIcon] = useState(true)
    const [values, setValues] = useState({
        showPassword: false,
    });
    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
        setShowIcon(!showIcon)
    }
    return(
        <div className='ChangePasswordWrap'>
                                <Icon path={mdiLockOutline} size={1} />
                                <input
                                    className='ChangePasswordInput'
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={props.value}
                                    onChange={props.onChange}
                                    placeholder={props.placeholder}
                                />
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
    );
}
export default  Password;