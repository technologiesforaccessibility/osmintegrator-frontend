import React from 'react';
import RoleCheckbox from './RoleCheckbox';

function CheckboxRow({roles, statuses, id}) {
  return roles.map((role, index) => {
    return <RoleCheckbox key={index} role={role} id={id} hasRole={statuses[role]} />;
  });
  // roles.map( role => { return (<RoleCheckbox />)})
}

export default CheckboxRow;
