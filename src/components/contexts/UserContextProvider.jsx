import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from '../../redux/selectors/authSelector';
import { validateLogin } from '../../redux/actions/authActions';
import { getVersion } from '../../redux/actions/appActions';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState(false);
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

  useEffect(() => {
    dispatch(getVersion());
  }, [dispatch]);

  //Todo: change name and change value to false
  const [isUnsafeAuthorized, setIsUnsafeAuthorized] = useState(true);

  if (isLoading) {
    return <></>;
  }

  return (
    <UserContext.Provider value={{ isUnsafeAuthorized, setIsUnsafeAuthorized, loader, setLoader }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
