import PropTypes, { string } from 'prop-types';

const ReportTextInput = ({ text, classToPass }) => {
  return <p className={classToPass}>{text}</p>;
};

PropTypes.ReportTextInput = {
  text: string.isRequired,
  classToPass: string,
};

export default ReportTextInput;
