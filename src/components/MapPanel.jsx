import React, {useContext} from 'react';

import {MapContext} from './contexts/MapContextProvider';
import ConnectionSidePanel from './ConnectionSidePanel';
import CustomBlockButton from './customs/CustomBlockButton';

import '../stylesheets/mapPanel.scss';
import buttonStyle from '../stylesheets/modules/mapPanelButton.module.scss';

const MapPanel = () => {
  const {
    showSingleTile,
    isViewMode,
    isReportMapMode,
    isConnectionMode,
    singleTileToggle,
    viewModeToggle,
    reportModeToggle,
    connectionModeToggle,
    reset,
  } = useContext(MapContext);

  const radios = [
    {
      title: 'See bus stop details',
      isChecked: isViewMode,
      onClickHandler: () => {
        viewModeToggle();
      },
    },
    {
      title: 'Create report on map',
      isChecked: isReportMapMode,
      onClickHandler: () => {
        reportModeToggle();
      },
    },
    {
      title: 'Create new connection',
      isChecked: isConnectionMode,
      onClickHandler: () => {
        connectionModeToggle();
      },
    },
  ];

  return (
    <>
      {showSingleTile && (
        <div className="map-panel__container">
          <div className="map-panel__button">
            <CustomBlockButton
              buttonTitle={'Hide tile'}
              style={buttonStyle}
              onClickHandler={() => {
                singleTileToggle(false);
                reset();
              }}
            />
          </div>
          <div>
            {radios.map(({title, isChecked, onClickHandler}, index) => (
              <div className="form-check" key={index}>
                <input className="form-check-input" type="radio" checked={isChecked} onChange={onClickHandler} />
                <label className="form-check-label">{title}</label>
              </div>
            ))}
          </div>
          {isConnectionMode && <ConnectionSidePanel />}
        </div>
      )}
    </>
  );
};

export default MapPanel;
