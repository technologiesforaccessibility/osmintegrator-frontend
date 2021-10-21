import {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Checkbox, CircularProgress, TextField} from '@mui/material';
import Button from '@mui/material/Button';

import H4Title from '../customs/H4Title';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {NotificationActions} from '../../redux/actions/notificationActions';
import {exception} from '../../utilities/exceptionHelper';

import '../../stylesheets/roleAssignmentPanel.scss';

function RoleAssignmentPanel() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [roleUserName, setRoleUserName] = useState('');
  const [userRoleList, setUserRoleList] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [selectedUserRoles, setSelectedUserRoles] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    getUserList().then(userList => {
      setUserRoleList(userList);
      setButtonDisabled(false);
      setShowLoader(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getUserList() {
    try {
      const response = await api.rolesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch (error) {
      exception(error);
    }
  }

  const users =
    userRoleList.length > 0
      ? userRoleList.map(({id, userName, roles}) => {
          return (
            <MenuItem key={userName} value={userName}>
              {userName}
            </MenuItem>
          );
        })
      : null;

  const selectedRoles =
    selectedUserRoles.length > 0 ? (
      selectedUserRoles.map(({name, value}, index) => {
        return (
          <FormControlLabel
            id={`role_${index}`}
            key={`role_${index}`}
            control={
              <Checkbox
                key={index}
                checked={value}
                onChange={() => handleCheckboxChanged(value, index)}
                name={name}
                labelId={`role_${index}`}
              />
            }
            label={name}
          />
        );
      })
    ) : (
      <p>{t('managementPanel.selectUserMessage')}</p>
    );

  const assignRole = async () => {
    setButtonDisabled(true);
    setShowLoader(true);

    let requestBody = [
      {
        ...selectedUserData,
        roles: selectedUserRoles,
      },
    ];

    try {
      const result = await api.rolesUpdate(requestBody, {
        headers: basicHeaders(),
      });
      const userList = await getUserList();

      dispatch(NotificationActions.success(result.data.value));

      setUserRoleList(userList);
      setSelectedUserData({});
      setSelectedUserRoles([]);
      setRoleUserName('');
      setButtonDisabled(false);
      setShowLoader(false);
    } catch (error) {
      exception(error);
      setButtonDisabled(false);
      setShowLoader(false);
    }
  };

  const handleCheckboxChanged = (value, index) => {
    let userData = [...selectedUserRoles];
    userData[index].value = !value;
    setSelectedUserRoles(userData);
  };

  const handleUsersListChanged = event => {
    const userName = event.target.value;

    const roleUser = userRoleList.find(x => x.userName === userName);
    if (roleUser) {
      setSelectedUserData({
        id: roleUser.id,
        userName: roleUser.userName,
      });
      const copiedRoles = [...roleUser.roles];
      setSelectedUserRoles(copiedRoles);
      setRoleUserName(roleUser.userName);
    }
  };

  return (
    <div className="role-assignmentPanel">
      <H4Title className="role-assignmentPanel__header" title={t('managementPanel.assignRoleTitle')} />
      {((showLoader || !users) && <CircularProgress />) || (
        <TextField
          id={'select-user-id'}
          variant={'filled'}
          select
          label={t('managementPanel.chooseUser')}
          value={roleUserName}
          onChange={handleUsersListChanged}
          margin="normal"
          fullWidth>
          {users}
        </TextField>
      )}
      <div className="role-assignmentPanel__checkboxes">{selectedRoles}</div>
      <Button
        className="role-assignmentPanel__button"
        onClick={assignRole}
        color="primary"
        variant="contained"
        disabled={buttonDisabled}
        fullWidth>
        {t('buttons.save')}
      </Button>
    </div>
  );
}

export default RoleAssignmentPanel;
