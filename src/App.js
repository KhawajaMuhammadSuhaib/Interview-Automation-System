import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter as Router } from "react-router-dom"
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom"
import Register from "./Pages/Public/Register";
import Login from "./Pages/Public/Login";
import ApplicantProfile from "./Pages/Applicant/ApplicantProfile";
import ForgetPassword from "./Pages/Public/ForgetPassword";
import ChangePassword from "./Pages/Public/ChangePassword";
import CompanyProfile from "./Pages/Company/CompanyProfile";
import CompanyJobPortal from "./Pages/Company/CompanyJobPortal";
import ApplicantJobPortal from "./Pages/Applicant/ApplicantJobPortal";
import PaymentAndSubscription from "./Pages/Company/CompanySubscription";
import ChatAndSupport from './Pages/Public/ChatAndSupport';
import ApplicantInterview from './Pages/Applicant/ApplicantInterview';
import CompanyInterview from './Pages/Company/CompanyInterview';
import jwt from 'jsonwebtoken'
import ChatAndSupport from './Pages/Company/ChatAndSupport';
import ApplicantInterview from './Pages/Applicant/ApplicantInterview';
import CompanyInterview from './Pages/Company/CompanyInterview';
import LiveCalls from './Pages/Company/LiveCalls';
import RecordVideo from './Pages/Applicant/Interviews/RecodedInterview';
import Logout from './Components/Logout';
import Chat from './Pages/Applicant/ApplicantChat';
import TaskInterview from './Pages/Applicant/Interviews/TaskInterview';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import UserContext from '../src/Context/User'

import { storeToken, getToken, removeToken } from '../src/Cache/User';
import UserContext from '../src/Context/User'


function App() {
  const [user, setUser] = useState('');
  useEffect(() => {
    chat();
  }, [])
  const chat = () => {
    window.loadWatsonAssistantChat({
      integrationID: "d2dce954-55fd-47c3-ac1e-fa70cad323c4", // The ID of this integration.
      region: "eu-gb", // The region your integration is hosted in.
      serviceInstanceID: "d304a3f5-51b9-41c2-94c4-492402436a05", // The ID of your service instance.
    }).then((instance) => {
      instance.render();
    });
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    if (data)
    {
      setUser(data)
    }
    
  }, [data,user])



  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Route exact path='/user-login' component={Login} />
        <Route path='/Register' component={Register} />
        <Route path='/ForgetPassword' component={ForgetPassword} />
        {
          !user ?
            <>
              <Route path='/resetPassword/:token'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/ApplicantProfile'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/CompanyProfile'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/JobPortal'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/Jobs'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/PaymentAndSubscription'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/CompanyChat'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/ApplicantInterview'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/CompanyInterview'>
                <Redirect to="/user-login" />
              </Route>
              <Route path='/AChat'>
                <Redirect to="/user-login" />
              </Route>
            </>
            :
            <>
              <Route path='/resetPassword/:token'>
                <ChangePassword />
              </Route>
              <Route path='/ApplicantProfile'>
                <ApplicantProfile />
              </Route>
              <Route path='/CompanyProfile'>
                <CompanyProfile />
              </Route>
              <Route path='/JobPortal'>
                <CompanyJobPortal />
              </Route>
              <Route path='/Jobs'>
                <ApplicantJobPortal />
              </Route>
              <Route path='/PaymentAndSubscription'>
                <PaymentAndSubscription />
              </Route>
              <Route path='/CompanyChat'>
                <ChatAndSupport />
              </Route>
              <Route path='/ApplicantInterview'>
                <ApplicantInterview />
              </Route>
              <Route path='/CompanyInterview'>
                <CompanyInterview />
              </Route>
              <Route path='/AChat'>
                <Chat />
              </Route>
              <Route path='/LiveCalls'>
                <LiveCalls />
              </Route>
              <Route path='/video'>
                <RecordVideo />
              </Route>
              <Route path='/Logout'>
                <Logout />
              </Route>
              <Route path='/Loader'>
                <TaskInterview />
              </Route>

            </>
        }

      </Router>
    </UserContext.Provider>
  );
}

export default App;
