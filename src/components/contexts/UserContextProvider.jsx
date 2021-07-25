<<<<<<< HEAD
import React, {createContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthToken} from '../../redux/selectors/authSelector';
import {validateLogin} from '../../redux/actions/authActions';
=======
import React, {createContext, useState} from 'react';
>>>>>>> 0674d0b73864091dd35247767e9ab8f006d79e29

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
<<<<<<< HEAD
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector(selectAuthToken);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(validateLogin()).finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    //Todo: change name and change value to false
    const [isUnsafeAuthorized, setIsUnsafeAuthorized] = useState(true);

    if (isLoading) {
        return <></>;
    }

    return (
        <UserContext.Provider value={{isUnsafeAuthorized, setIsUnsafeAuthorized}}>
            {children}
        </UserContext.Provider>
    )
}
=======
  //Todo: change name and change value to false
  const [isUnsafeAuthorized, setIsUnsafeAuthorized] = useState(true);

  return <UserContext.Provider value={{isUnsafeAuthorized, setIsUnsafeAuthorized}}>{children}</UserContext.Provider>;
};
>>>>>>> 0674d0b73864091dd35247767e9ab8f006d79e29

export default UserContextProvider;
