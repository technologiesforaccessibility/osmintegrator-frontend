import { useEffect, useState, useMemo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox, CircularProgress, TextField } from '@mui/material';
import Button from '@mui/material/Button';

import H4Title from '../customs/H4Title';
import api from '../../api/apiInstance';
import { RoleUser, RolePair } from '../../api/apiClient';
import { basicHeaders } from '../../config/apiConfig';
import { NotificationActions } from '../../redux/actions/notificationActions';
import { exception } from '../../utilities/exceptionHelper';

import '../../stylesheets/roleAssignmentPanel.scss';

function RoleAssignmentPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [roleUserName, setRoleUserName] = useState('');
  const [userRoleList, setUserRoleList] = useState<RoleUser[]>([]);
  const [selectedUserData, setSelectedUserData] = useState<RoleUser | null>(null);
  const [selectedUserRoles, setSelectedUserRoles] = useState<RolePair[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    getUserList().then(userList => {
      setUserRoleList(userList || []);
      setShowLoader(false);
    });
  }, []);

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

  const users = useMemo(
    () =>
      userRoleList.map(({ id, userName, roles }) => {
        return (
          <MenuItem key={userName} value={userName}>
            {userName}
          </MenuItem>
        );
      }),
    [userRoleList],
  );

  const handleCheckboxChanged = useCallback(
    (value: boolean, index: number) => {
      let userData = [...selectedUserRoles];
      userData[index].value = !value;
      setSelectedUserRoles(userData);
    },
    [selectedUserRoles],
  );

  const selectedRoles = useMemo(
    () =>
      (selectedUserRoles.length &&
        selectedUserRoles.map(({ name, value }, index) => (
          <FormControlLabel
            id={`role_${index}`}
            key={`role_${index}`}
            control={
              <Checkbox
                key={index}
                checked={value}
                onChange={() => handleCheckboxChanged(!!value, index)}
                name={name || undefined}
              />
            }
            label={name}
          />
        ))) || <p>{t('managementPanel.selectUserMessage')}</p>,
    [selectedUserRoles, handleCheckboxChanged, t],
  );

  const assignRole = async () => {
    if (!selectedUserData) {
      return;
    }

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

      dispatch(NotificationActions.success((result.data as unknown as Record<string, string>).value));

      setUserRoleList(userList || []);
      setSelectedUserData(null);
      setSelectedUserRoles([]);
      setRoleUserName('');
      setShowLoader(false);
    } catch (error) {
      exception(error);
      setShowLoader(false);
    }
  };

  const handleUsersListChanged = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const userName = event.target.value;

    const roleUser = userRoleList.find(x => x.userName === userName);
    if (roleUser) {
      setSelectedUserData(roleUser);
      const copiedRoles = [...roleUser.roles];
      setSelectedUserRoles(copiedRoles);
      setRoleUserName(roleUser.userName);
    }
  };

  return (
    <div className="role-assignmentPanel">
      <H4Title title={t('managementPanel.assignRoleTitle')} />
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
        disabled={showLoader || !roleUserName}
        fullWidth>
        {t('buttons.save')}
      </Button>
    </div>
  );
}

export default RoleAssignmentPanel;
