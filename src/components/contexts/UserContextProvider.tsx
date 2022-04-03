import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getVersion } from 'redux/actions/appActions';
import { validateLogin } from 'redux/actions/authActions';
import { selectAuthToken } from 'redux/selectors/authSelector';
import { useAppDispatch } from 'redux/store';

type TUserContextValues = {
  isUnsafeAuthorized: boolean;
  setIsUnsafeAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  loader: boolean;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
};

type TUserContextProps = {
  children: ReactNode;
};

const defaultValue: TUserContextValues = {
  isUnsafeAuthorized: false,
  setIsUnsafeAuthorized: () => {},
  loader: false,
  setLoader: () => {},
};

export const UserContext = createContext(defaultValue);

const UserContextProvider: FC<TUserContextProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const token = useSelector(selectAuthToken);
  const dispatch = useAppDispatch();

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
