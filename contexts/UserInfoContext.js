import React, { createContext, useState } from 'react';

export const UserInfoContext = createContext();


const UserInfoContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState([])

    const setUser =(userinfo) =>{
        setUserInfo(userinfo);
    }

    return (
        <UserInfoContext.Provider value={{userInfo,setUser}}>
            {props.children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;
