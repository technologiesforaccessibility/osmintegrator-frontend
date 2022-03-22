import { FC } from 'react';

type TReportInfoProps = {
  text: string;
};

const ReportInfo: FC<TReportInfoProps> = ({ text }) => <p>{text}</p>;

export default ReportInfo;
