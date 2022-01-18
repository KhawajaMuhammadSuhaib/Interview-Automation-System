import React from 'react'
import { Checkbox } from 'antd';

export default function InterviewSettings() {
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    return (
        <div>
            <p className='UnderLineHeader'>Interview Flow & Settings</p>
            <p className='MainHeading'>Select the interviews which you want to include.</p>
            <div className='flex'>
                <div className='SelectionContainer'>
                    <Checkbox className='Checkbox' onChange={onChange}>Questionnaire Interview </Checkbox>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please specify the programming language for the interview.</p>
                        <input className='inputFeild' type='text' placeholder='Languages' />
                    </div>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please specify the number of questions for the interview.</p>
                        <input className='inputFeild' type='number' />
                    </div>
                </div>
                <div className='SelectionContainer'>
                    <Checkbox className='Checkbox' onChange={onChange}>Codding Interview </Checkbox>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please specify the programming language for the interview.</p>
                        <input className='inputFeild' type='text' placeholder='Languages' />
                    </div>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please specify the number of questions for the interview.</p>
                        <input className='inputFeild' type='number' />
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='SelectionContainer'>
                    <Checkbox className='Checkbox' onChange={onChange}>Recorded Interview </Checkbox>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please specify the question for the interview.</p>
                        < input className='inputFeild' type='text' placeholder='' />
                    </div>
                </div>
                <div className='SelectionContainer'>
                    <Checkbox className='Checkbox' onChange={onChange}>Assessment Interview </Checkbox>
                    <div className='ChoiceContainer'>
                        <p className='Heading'>Please upload the assessment for the interview.</p>
                        < input type='file' placeholder='Languages' />
                    </div>
                </div>
            </div>
        </div>
    )
}