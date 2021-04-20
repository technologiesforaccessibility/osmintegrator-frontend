import React from 'react';

const CustomDropdownMenu = ({children}) => {
    return (
        <div
            className="dropdown-menu custom-elements__scrollable-dropdown-menu"
            aria-labelledby="dropdownTileButton">
            {children}
        </div>
    );
};

export default CustomDropdownMenu;
