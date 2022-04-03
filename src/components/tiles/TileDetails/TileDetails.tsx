import './tileDetails.scss';

import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { MapContext } from '../../contexts/MapContextProvider';
const TileDetails = () => {
  const { activeTile } = useContext(MapContext);
  const { t } = useTranslation();

  return (
    <div className="tile-details bordered-wrapper">
      <p className="tile-details__title">{t('tileDetails.title')}</p>
      {activeTile && (
        <div className="tile-details__wrapper">
          <fieldset className="tile-details__detail">
            <legend className="tile-details__heading">{t('tileDetails.database')}</legend>
            <div className="tile-details__body">
              <span>Id: {activeTile.id}</span>
            </div>
          </fieldset>
          <fieldset className="tile-details__detail">
            <legend className="tile-details__heading">{t('tileDetails.coordinates')}</legend>
            <div className="tile-details__body">
              <span>X: {activeTile.x}</span>
              <span>Y: {activeTile.y}</span>
              <span>
                {t('tileDetails.zoom')} {activeTile.zoomLevel}
              </span>
              <span>
                {t('tileDetails.minLat')} {activeTile.minLat}
              </span>
              <span>
                {t('tileDetails.minLong')} {activeTile.minLon}
              </span>
              <span>
                {t('tileDetails.maxLat')} {activeTile.maxLat}
              </span>
              <span>
                {t('tileDetails.maxLong')} {activeTile.maxLon}
              </span>
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
};

export default TileDetails;
