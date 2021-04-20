import React from 'react';

const CustomCheckbox = ({name, value , handleOnChange = () => {}}) => {
    return (
        <div key={name} className="custom-elements__checkbox-wrapper">
            <input
                type="checkbox"
                checked={value}
                onChange={handleOnChange}
            />
            <label className="custom-elements__checkbox-label">{name}</label>{' '}
            {value.toString()}
        </div>
    );
};

export default CustomCheckbox;
