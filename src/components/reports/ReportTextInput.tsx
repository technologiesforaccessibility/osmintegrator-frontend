import { FC } from 'react';

type TReportTextInputProps = {
  text: string;
  classToPass: string;
};

const ReportTextInput: FC<TReportTextInputProps> = ({ text, classToPass }) => <p className={classToPass}>{text}</p>;

export default ReportTextInput;
