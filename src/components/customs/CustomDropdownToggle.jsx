import React from 'react';

const CustomDropdownToggle = ({children}) => {
  return (
    <button
      className="btn btn-secondary dropdown-toggle custom-elements__button--use-all-width"
      type="button"
      id="dropdownTileUserButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false">
      {children}
    </button>
  );
};

export default CustomDropdownToggle;
