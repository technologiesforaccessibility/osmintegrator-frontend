import React, {createContext, useState} from 'react';


export const UserContext = createContext();

const UserContextProvider = ({children}) => {

    //Todo: change name and change value to false
    const [isUnsafeAuthorized, setIsUnsafeAuthorized] = useState(true);

    return (
        <UserContext.Provider value={{isUnsafeAuthorized, setIsUnsafeAuthorized}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;