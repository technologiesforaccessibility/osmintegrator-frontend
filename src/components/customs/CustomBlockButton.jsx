import React from 'react';

const CustomBlockButton = ({handleOnClick = () => {}, buttonTitle = 'Name Me', className, ...props}) => {
    return (
        <button
            type="button"
            className={`btn btn-secondary custom-elements__button--use-all-width ${className || ''}`}
            onClick={handleOnClick}
            {...props}>
            {buttonTitle}
        </button>
    );
};

export default CustomBlockButton;
