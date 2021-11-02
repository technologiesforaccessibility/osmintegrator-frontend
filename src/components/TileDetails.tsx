import React, {useContext} from 'react';

import {MapContext} from './contexts/MapContextProvider';
import '../stylesheets/tileDetails.scss';
import {useTranslation} from 'react-i18next';
const TileDetails = () => {
  const {activeTile} = useContext(MapContext);
  const {t} = useTranslation();

  return (
    <div className="tile-details bordered-wrapper">
      <h5 className="tile-details__title">{t('tileDetails.title')}</h5>
      {activeTile && (
        <div className="tile-details__wrapper">
          <div className="tile-details__detail">
            <div className="tile-details__heading">{t('tileDetails.database')}</div>
            <div className="tile-details__body">
              <span>Id: {activeTile.id}</span>
            </div>
          </div>
          <div className="tile-details__detail">
            <div className="tile-details__heading">{t('tileDetails.coordinates')}</div>
            <div className="tile-details__body">
              <span>X: {activeTile.x}</span>
              <span>Y: {activeTile.y}</span>
              <span>Zoom: {activeTile.id}</span>
              <span>Min lat: {activeTile.minLat}</span>
              <span>Min long: {activeTile.minLon}</span>
              <span>Max lat: {activeTile.maxLat}</span>
              <span>Max long: {activeTile.maxLon}</span>
            </div>
          </div>
          <div className="tile-details__detail">
            <div className="tile-details__heading">{t('tileDetails.assignedEditor')}</div>
            <div className="tile-details__body">
              <span>Id: {activeTile.x}</span>
              <span>Tile approved: {activeTile.approvedByEditor ? t('yes') : t('no')}</span>
            </div>
          </div>
          <div className="tile-details__detail">
            <div className="tile-details__heading">{t('tileDetails.assignedSupervisor')}</div>
            <div className="tile-details__body">
              <span>User name: {activeTile.x}</span>
              <span>Tile approved: {activeTile.approvedBySupervisor ? t('yes') : t('no')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TileDetails;
