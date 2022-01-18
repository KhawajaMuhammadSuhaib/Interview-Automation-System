import React, { useEffect } from 'react'
import NavBar from '../../Components/Navbar';
import ApplicantSideBar from '../../Components/ApplicantSideBar';


export default function Chat() {
    // useEffect(()=>{
    //     chat();
    // })
    // const chat=()=>{
    //     window.loadWatsonAssistantChat ( {
    //         integrationID: "d2dce954-55fd-47c3-ac1e-fa70cad323c4", // The ID of this integration.
    //         region: "eu-gb", // The region your integration is hosted in.
    //         serviceInstanceID: "d304a3f5-51b9-41c2-94c4-492402436a05", // The ID of your service instance.
    //     }).then((instance)=>{
    //         instance.render();
    //     });
    // }
    return (
        <div>
            <NavBar />
            <ApplicantSideBar />
            <div className='body-content'>
                <p className='UnderLineHeader'>Complains</p>
                <div className='FeildsWrap'>
                    <div className='inputContainer'>
                        <p className='inputlabel'>Name</p>
                        <input className='inputfeild' type='text' />
                    </div>
                    <div className='inputContainer'>
                        <p className='inputlabel'>Title</p>
                        <input className='inputfeild' type='text'  required />
                    </div>
                </div>
                <div className='inputContainer'>
                    <p className='inputlabel'>Description</p>
                    <textarea className='textarea' rows='5' cols='100' ></textarea>
                </div>
                <div className="ButtonWrap">
                    {/* <div className='ProfileButton' style={{ background: 'lightgray', color: 'black' }}>Cancel</div> */}
                    <div className='ApplyButton' >Submit</div>
                </div>
            </div>
        </div>
    );
}