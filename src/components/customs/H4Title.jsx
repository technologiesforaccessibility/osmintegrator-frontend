import React from 'react';

function H4Title({title, borderBottom = false}) {
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
          <h4>{title}</h4>
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
          <h4>{title}</h4>
        </div>
      )}
    </React.Fragment>
  );
}

export default H4Title;
