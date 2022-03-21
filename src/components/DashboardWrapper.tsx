import '../stylesheets/dashboard.scss';

import { FC, ReactNode } from 'react';

import DashboardHeader from './DashboardHeader';
import Footer from './Footer';

type TDashboardWrapperProps = {
  children: ReactNode;
};

const DashboardWrapper: FC<TDashboardWrapperProps> = ({ children }) => (
  <div className="dashboard">
    <div className="dashboard__header">
      <DashboardHeader />
    </div>
    <div className="dashboard__content">{children}</div>
    <div className="dashboard__footer">
      <Footer />
    </div>
  </div>
);

export default DashboardWrapper;
