import React from 'react';
import RoleCheckbox from "./RoleCheckbox";

function CheckboxRow({roles, statuses, id}) {
    // console.log ("Roles is:", roles)
    // console.log ("Statuses is:", statuses)
    // console.log ('Statuses["Editor"] is:', statuses["Editor"])
    return (
        roles.map( role => { return (<RoleCheckbox role={role} id={id} hasRole={statuses[role]} />)})
        // roles.map( role => { return (<RoleCheckbox />)})
    );
}

export default CheckboxRow;
