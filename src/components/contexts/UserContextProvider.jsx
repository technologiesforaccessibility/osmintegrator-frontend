import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../redux/selectors/authSelector';
import {validateLogin} from '../../redux/actions/authActions';

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const token = useSelector(selectAuthToken);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validateLogin());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //Todo: change name and change value to false
    const [isUnsafeAuthorized, setIsUnsafeAuthorized] = useState(true);

    return (
        <UserContext.Provider value={{isUnsafeAuthorized, setIsUnsafeAuthorized}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
