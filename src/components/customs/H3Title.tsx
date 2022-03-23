import React, { FC } from 'react';

type TH3TitleProps = {
  title: string;
  borderBottom?: boolean;
};

const H3Title: FC<TH3TitleProps> = ({ title, borderBottom = false }) => {
  return (
    <React.Fragment>
      {borderBottom === true ? (
        <div
          className="d-flex
                    justify-content-between
                    flex-wrap
                    flex-md-nowrap
                    align-items-center
                    pt-3
                    pb-2
                    mb-3
                    border-bottom">
          <h3>{title}</h3>
        </div>
      ) : (
        <div
          className="d-flex
                    justify-content-between
                    flex-wrap
                    flex-md-nowrap
                    align-items-center
                    pt-3
                    pb-2
                    mb-3">
          <h3>{title}</h3>
        </div>
      )}
    </React.Fragment>
  );
};

export default H3Title;
