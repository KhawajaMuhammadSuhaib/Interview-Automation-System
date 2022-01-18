import React,{useContext} from 'react';
import '../StyleSheets/web.css'
import { AdminSideBarData } from '../Components/AdminSideBarTitles';
import { NavLink } from 'react-router-dom';
// import UserContext from '../Context/User';
// import { removeToken } from '../Cache/User';

function AdminSideBar() {
    // const { user, setUser } = useContext(UserContext);

    // const LogOut=()=>{
    //     setUser('')
    //     removeToken();
    // }
    return (
        <div className='sidebarContainer'>
            <div className='sidebar'>
                {
                    AdminSideBarData.map((data, index) =>
                        <div className='itemWrap' key={index} >
                            <NavLink to={data.path} activeClassName='onClick' className='item'>
                                {data.icon}
                                <p className='itemTitle'>{data.title}</p>
                            </NavLink>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
export default AdminSideBar;
