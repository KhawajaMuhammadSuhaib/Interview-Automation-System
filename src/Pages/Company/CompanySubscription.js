import React, { useContext, useEffect, useState } from "react";
import CompanySideBar from '../../Components/CompanySideBar';
import NavBar from '../../Components/Navbar'
import UserContext from '../../Context/User';
import axios from 'axios';
import { useHistory } from 'react-router';
export default function PaymentAndSubscription() {
    const History = useHistory();
    const { user, setUser } = useContext(UserContext);
    const [start, setStart] = useState('')
    const [end, SetEnd] = useState('')
    const [status, setStatus] = useState('')
    useEffect(() => {
        axios.get('https://iastestingapi.herokuapp.com/api/company/getSubscription', { headers: { 'x-access-token': user.token } })
            .then(async (res) => {
                let Sdate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(res.data[0].periodStart)
                let Edate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(res.data[0].periodEnd)
                setStart(Sdate)
                SetEnd(Edate)
                setStatus(res.data[0].status)
            })
            .catch(async (err) => {
                console.log(err)
            })
    }, [user])
    const HandlePayment = () => {
        axios.post('https://iastestingapi.herokuapp.com/api/company/checkout', {}, { headers: { 'x-access-token': user.token } })
            .then(async (res) => {
                console.log(res.data)
                if (typeof window !== 'undefined') {
                    window.location.href = res.data.session.url;
                }

            }).catch(async (err) => {
                console.log(err)
            })
    }
    const HandleCustomerPortal = () => {
        axios.post('https://iastestingapi.herokuapp.com/api/company/customerPortal', {}, { headers: { 'x-access-token': user.token } })
            .then(async (res) => {
                console.log(res.data)
                if (typeof window !== 'undefined') {
                    window.location.href = res.data.url;
                }

            }).catch(async (err) => {
                console.log(err)
            })
    }
    return (
        <div>
            <CompanySideBar />
            <NavBar />
            <div className='CompanyJobPortalContainer'>
                <p className='UnderLineHeader'>Payment & Subscription</p>
                <div className='Membership'>
                    <div className="MembershipTextContainer">
                        <p className="MembershipText">Current Plan</p>
                        {user.user.subscribed ?
                            <>
                                <p className="MembershipPlan Title">Basic Montly Pack</p>
                                <p className="MembershipPlan Active">Status: {status}</p>
                                <p className="MembershipPlan">Start Date: {start}</p>
                                <p className="MembershipPlan">End Date: {end}</p>
                            </>
                            :
                            <p className="MembershipPlan">No Plan Selected</p>
                        }
                        <p className="MembershipText"></p>
                        <div className={`ApplyButton ${user.user.subscribed ? "noDisplay" : ''}`} onClick={HandlePayment}>Subscribe</div>
                    </div>
                    <div className='ManageMembership'>
                        <div className='ApplyButton' onClick={HandleCustomerPortal}>Manage</div>
                    </div>
                </div>
                <p className='UnderLineHeader'>Transaction History</p>
                <div className='JobTableHeaderRow'>
                    <div className='JobTableHeader'>Index</div>
                    <div className='JobTableHeader'>Package</div>
                    <div className='JobTableHeader'>Status</div>
                    <div className='JobTableHeader'>Start Date</div>
                    <div className='JobTableHeader' style={{ border: 'none' }}>End Date</div>
                </div>
                {
                    user.user.subscribed ?
                        <div className='JobTableDataRow'>
                            <div className='JobTableColumn'>1</div>
                            <div className='JobTableColumn Title'>Basic Monthly Package</div>
                            <div className='JobTableColumn Active'>{status}</div>
                            <div className='JobTableColumn'>{start}</div>
                            <div className='JobTableColumn ' style={{ border: 'none' }}>{end}</div>
                        </div>
                        :
                        <p>No data to show</p>
                   }
            </div>

        </div>
    )

}
