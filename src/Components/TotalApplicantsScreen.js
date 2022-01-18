import React, { useState, useEffect } from 'react';
import Icon from '@mdi/react';
import ProfileCard from '../Components/profileCard';
import PopUp from '../Components/PopUp';
import { mdiPencilOutline, mdiTrashCanOutline, mdiDotsVertical } from '@mdi/js';
import '../StyleSheets/web.css'
import axios from 'axios';



function ViewApplicants(props) {
    // console.log(props.data[0].applied[0].name)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const[userProfile,setUserProfile]= useState('')
    const [selected, setSelected] = useState(false);
    const [rejected, setRejected] = useState(false);
    useEffect(() => {
        if (props.data[0]) {
            setData(props.data[0].applied);
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [data, loading])
    if (!props.show) {
        return null
    }


    const HandleSelection = (userID,jobID) => {
        const values = {
            jobID: jobID,
            userID: userID
        }
        axios.put('https://iastestingapi.herokuapp.com/api/company/acceptAppilcant',
            { ...values },
            { headers: { 'x-access-token': props.user.token } }
        ).then(async (res) => {
            setSelected(true);
        }).catch(async (err) => {
            console.log(err)
        })

    }
    const HandleRejection = (userID,jobID) => {
        const values = {
            jobID: jobID,
            userID: userID
        }
        axios.put('https://iastestingapi.herokuapp.com/api/company/rejectAppilcant',
            { ...values },
            { headers: { 'x-access-token': props.user.token } }
        ).then(async (res) => {
            setRejected(true);
        }).catch(async (err) => {
            console.log(err)
        })

    }

    const ViewProfile = (userID) => {
        axios.get('https://iastestingapi.herokuapp.com/api/company/particularUserDetail/' + userID,
            { headers: { 'x-access-token': props.user.token } }
        ).then(res=>{
            setUserProfile(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }



    return (
        <div className='ApplicantsScreen' onClick={props.onClose}>
            <div className='ApplicantScreenModal'>
                <p className='UnderLineHeader'>Applicants</p>
                <div className='ApplicantTableHeaderRow'>
                    <div className='ApplicantTableHeader index'>Index</div>
                    <div className='ApplicantTableHeader '>Name</div>
                    <div className='ApplicantTableHeader Hemail'>Email</div>
                    <div className='ApplicantTableHeader'>Details</div>
                    <div className='ApplicantTableHeader index' style={{ border: 'none' }}>Options</div>
                </div>
                {
                    loading ? <p>loading</p> :
                        data.map((val, index) =>
                            <div className='JobTableDataRow' key={index}>
                                <div className='JobTableColumn'>{parseInt(index) + 1}</div>
                                <div className='JobTableColumn Title'>{val.name}</div>
                                <div className='JobTableColumn' >{val.email}</div>
                                <div className='JobTableColumn' onClick={() => ViewProfile(val._id)}><a>view</a></div>
                                <div className='JobTableColumn ' style={{ border: 'none' }}>
                                    <div className="Options" >
                                        <Icon className='' path={mdiDotsVertical} size={1} />
                                        <div class="DropDowncontent">
                                            <div onClick={()=>HandleSelection(val._id,props.data[0]._id)} >
                                                <Icon className='OptionsIcon' path={mdiPencilOutline} size={1} />
                                                <p>Accept</p>
                                            </div>
                                            <div onClick={()=>HandleRejection(val._id,props.data[0]._id)}>
                                                <Icon className='OptionsIcon' path={mdiTrashCanOutline} size={1} />
                                                <p>Reject</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    );
}
export default ViewApplicants;


