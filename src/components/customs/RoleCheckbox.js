import React from 'react';

function RoleCheckbox({role}, {id}) {
    return (
        <div
            className="d-inline-block form-check management-panel__check-box"
            >
            <input
                className="form-check-input"
                type="checkbox"
                id={id}
                value="option1"
                onClick={console.log(role, id)}
                style={{margin: '0 auto'}}
            />
        </div>
    );
}

export default RoleCheckbox;
