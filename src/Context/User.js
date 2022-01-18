import React from 'react'
const UserContext = React.createContext();
export default UserContext;
import React,{useContext} from 'react'
const UserContext = React.createContext();
export default UserContext;
export const useUser=()=>{
    const {user,setUser}=useContext(UserContext);
    return user;
}
