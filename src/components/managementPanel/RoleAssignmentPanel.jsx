import {useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Checkbox, CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import H4Title from '../customs/H4Title';
import api from '../../api/apiInstance';
import {basicHeaders} from '../../config/apiConfig';
import {NotificationActions} from '../../redux/actions/notificationActions';

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
  }, []);

  async function getUserList() {
    try {
      const response = await api.rolesList({
        headers: basicHeaders(),
      });
      return response.data;
    } catch {
      console.log('User Role List problem');
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
            control={
              <Checkbox key={index} checked={value} onChange={() => handleCheckboxChanged(value, index)} name={name} />
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
    } catch {
      console.log('Update role problem');

      dispatch(NotificationActions.error(t('unrecognizedProblem')));
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

      <div className="role-assignmentPanel__dropdown">
        {showLoader && <CircularProgress />}
        {!showLoader && (
          <FormControl className="role-assignmentPanel__dropdown--dropdown">
            <InputLabel>{t('managementPanel.chooseUser')}</InputLabel>
            <Select onChange={handleUsersListChanged} value={roleUserName}>
              {users}
            </Select>
          </FormControl>
        )}
      </div>

      <div className="role-assignmentPanel__checkboxes">{selectedRoles}</div>

      <Button
        className="role-assignmentPanel__button"
        onClick={assignRole}
        color="primary"
        variant="contained"
        disabled={buttonDisabled}>
        {t('buttons.save')}
      </Button>
    </div>
  );
}

export default RoleAssignmentPanel;
