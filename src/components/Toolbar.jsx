import React from 'react';

const Toolbar = () => {
  return (
    <div className="btn-toolbar mb-2 mb-md-0">
      <div className="btn-group me-2">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false">
            Choose tile to work with
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/">
              Katowice
            </a>
            <a className="dropdown-item" href="/">
              Gliwice
            </a>
            <a className="dropdown-item" href="/">
              Bytom
            </a>
          </div>
        </div>
        <button type="button" className="btn btn-sm btn-secondary">
          Save
        </button>
        <button type="button" className="btn btn-sm btn-secondary">
          Edit
        </button>
      </div>
      <button type="button" className="btn btn-sm btn-secondary dropdown-toggle">
        <span data-feather="calendar"></span>
        Mode
      </button>
    </div>
  );
};
export default Toolbar;
