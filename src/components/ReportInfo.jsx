import PropTypes, {string} from 'prop-types';

const ReportInfo = ({text}) => {
  return <p>{text}</p>;
};
PropTypes.ReportInfo = {
  text: string.isRequired,
};

export default ReportInfo;
