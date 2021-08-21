import * as React from 'react';
import {useTranslation} from 'react-i18next';

import '../../stylesheets/deleteConnectionPopup.scss';

const DeleteConnectionPopup = ({closePopup, deleteConnection, osm, gtfs, id}) => {
  const {t} = useTranslation();

  return (
    <div>
      <div className="global-styles__text--center-align connection-popup__message">
        {t('connection.deleteConnectionConfirmation')}
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={() => {
            deleteConnection(osm, gtfs);
            closePopup();
          }}>
          {t('buttons.confirm')}
        </button>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm connection-popup__button"
          onClick={() => {
            closePopup();
          }}>
          {t('buttons.cancel')}
        </button>
      </div>
    </div>
  );
};

export default DeleteConnectionPopup;
