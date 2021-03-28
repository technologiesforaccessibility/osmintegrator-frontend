import React from 'react';

// function RoleCheckbox({role}, {id}, {hasRole= true}) {
function RoleCheckbox(props) {
    const checkValue =  (!!props.hasRole) ? "checked": "";
    return (
        <div
            className="d-inline-block form-check management-panel__check-box"
            >
            <input
                className="form-check-input"
                type="checkbox"
                checked={checkValue}
                value="option1"
                onClick={ () => {}}
                style={{margin: '0 auto'}}
            />
        </div>
    );
}

export default RoleCheckbox;
