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
    flush,
  } = useContext(MapContext);

  const radios = [
    {
      title: 'See bus stop details',
      isChecked: isViewMode,
      onClickHandler: e => {
        viewModeToggle(e.target.checked);
      },
    },
    {
      title: 'Create report on map',
      isChecked: isReportMapMode,
      onClickHandler: e => {
        reportModeToggle(e.target.checked);
      },
    },
    {
      title: 'Create new connection',
      isChecked: isConnectionMode,
      onClickHandler: e => {
        connectionModeToggle(e.target.checked);
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
              handleOnClick={() => {
                singleTileToggle(false);
                flush();
              }}
            />
          </div>
          <div>
            {radios.map(({title, isChecked, onClickHandler}) => (
              <div className="form-check">
                <input className="form-check-input" type="radio" checked={isChecked} onClick={onClickHandler} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  {title}
                </label>
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
