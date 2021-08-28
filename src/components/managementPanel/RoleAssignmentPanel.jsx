import { useEffect, useState } from 'react';

import H4Title from '../customs/H4Title';
import CustomDropdownToggle from '../customs/CustomDropdownToggle';
import CustomDropdownMenu from '../customs/CustomDropdownMenu';
import CustomInlineButton from '../customs/CustomInlineButton';
import api from '../../api/apiInstance';
import { basicHeaders } from '../../config/apiConfig';
import CustomCheckbox from '../customs/CustomCheckbox';

import '../../stylesheets/managementPanel.scss';

function RoleAssignmentPanel() {
  const [userButtonRole, setUserButtonRole] = useState(['Choose User']);
  const [userRoleList, setUserRoleList] = useState([]);
  const [selectedUserData, setSelectedUserData] = useState({});
  const [selectedUserRoles, setSelectedUserRoles] = useState([]);

  useEffect(() => {
    getUserList().then(userList => {
      setUserRoleList(userList);
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

  const usersForRoleAssignment =
    userRoleList.length > 0
      ? userRoleList.map(({ id, userName, roles }) => {
        return (
          <button
            key={userName}
            className="dropdown-item"
            onClick={() => {
              setUserButtonRole(userName);

              // roles in new memory location ?
              const copiedRoles = [...roles];
              setSelectedUserData({ id, userName });
              setSelectedUserRoles(copiedRoles);
            }}>
            {userName}
          </button>
        );
      })
      : null;

  const roleCheckboxes =
    selectedUserRoles.length > 0 ? (
      selectedUserRoles.map(({ name, value }, index) => {
        return (
          <CustomCheckbox key={index} value={value} name={name} handleOnChange={() => handleCbChange(value, index)} />
        );
      })
    ) : (
      <p>You havent chosen user yet</p>
    );

  const assignRole = async () => {
    let requestBody = [
      {
        ...selectedUserData,
        roles: selectedUserRoles,
      },
    ];

    try {
      await api.rolesUpdate(requestBody, {
        headers: basicHeaders(),
      });
      const userList = await getUserList();
      setUserRoleList(userList);
      setUserButtonRole(['Choose User']);
      setSelectedUserData({});
      setSelectedUserRoles([]);
    } catch {
      console.log('Update role problem');
    }
  };

  const handleCbChange = (value, index) => {
    let userData = [...selectedUserRoles];
    userData[index].value = !value;
    setSelectedUserRoles(userData);
  };

  return (
    <div className="management-panel">
      <H4Title title="Assign role to user" />
      <div className="dropdown d-inline-block management-panel__button management-panel__button--30p">
        <CustomDropdownToggle>{userButtonRole}</CustomDropdownToggle>
        <CustomDropdownMenu>{usersForRoleAssignment}</CustomDropdownMenu>
      </div>
      <CustomInlineButton handleOnClick={() => assignRole()} buttonTitle="Save changes" buttonWidth={30} />
      {roleCheckboxes}
    </div>
  );
}

export default RoleAssignmentPanel;