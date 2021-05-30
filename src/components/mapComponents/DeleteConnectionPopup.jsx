import * as React from 'react';

import '../../stylesheets/deleteConnectionPopup.scss';

const DeleteConnectionPopup = ({closePopup, deleteConnection, osm, gtfs, id}) => {
    return (
        <div>
            <div className="global-styles__text--center-align connection-popup__message">
                Delete?
            </div>
            <div>
                <button
                    type="button"
                    className="btn btn-outline-success btn-sm"
                    onClick={() => {
                        deleteConnection(osm, gtfs);
                        closePopup();
                    }}>
                    Confirm
                </button>
                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm connection-popup__button"
                    onClick={() => {
                        closePopup();
                    }}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteConnectionPopup;
