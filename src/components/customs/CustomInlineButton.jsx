import React from 'react';

const CustomInlineButton = ({ handleOnClick = () => {}, buttonTitle = 'Name Me', buttonWidth = 15 }) => {
  return (
    <div className={`d-inline-block custom-elements__button-wrapper management-panel__button--${buttonWidth}p`}>
      <button
        type="button"
        className="btn btn-secondary custom-elements__button--use-all-width"
        onClick={handleOnClick}>
        {buttonTitle}
      </button>
    </div>
  );
};

export default CustomInlineButton;
