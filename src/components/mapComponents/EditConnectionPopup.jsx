import * as React from 'react';
import { useTranslation } from 'react-i18next';

import '../../stylesheets/editConnectionPopup.scss';

const EditConnectionPopup = ({ closePopup, deleteConnection, osm, gtfs }) => {
  const { t } = useTranslation();

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
          {t('buttons.delete')}
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

export default EditConnectionPopup;
