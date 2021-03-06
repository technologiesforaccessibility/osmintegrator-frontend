import React from 'react';
import PropTypes from 'prop-types';

const CustomBlockButton = ({onClickHandler, buttonTitle, className, ...props}) => {
  return (
    <button
      type="button"
      className={`btn btn-secondary custom-elements__button--use-all-width ${className}`}
      onClick={onClickHandler}
      {...props}>
      {buttonTitle}
    </button>
  );
};

export default CustomBlockButton;

CustomBlockButton.propTypes = {
  onClickHandler: PropTypes.func,
  buttonTitle: PropTypes.string,
  className: PropTypes.string,
  props: PropTypes.any,
};
CustomBlockButton.defaultProps = {
  onClickHandler: () => {},
  buttonTitle: 'Name Me',
  className: '',
};
