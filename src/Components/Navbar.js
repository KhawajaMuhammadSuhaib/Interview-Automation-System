import React,{useContext} from 'react';
import Icon from '@mdi/react';
import { mdiBell, mdiCog } from '@mdi/js';
import '../StyleSheets/web.css';
import UserContext from '../Context/User';


function NavBar() {
//   const [user, setUser] = useContext(UserContext);

    return (
        <div className='NavBarContainer'>
            <div className='NavBar'>
                <p>Hi !</p>
                <div className='NavBarIconWrap' >
                    <Icon className='NavBarIcon' path={mdiBell} size={1} />
                    <div className="dropdown">
                        <span><Icon className='NavBarIcon' path={mdiCog} size={1} /></span>
                        <div class="dropdown-content">
                            <p>Settings</p>
                            <p>Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NavBar;