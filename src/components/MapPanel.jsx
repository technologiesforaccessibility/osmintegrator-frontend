import {useContext, useState} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReportIcon from '@material-ui/icons/Report';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useTranslation} from 'react-i18next';

import {MapContext} from './contexts/MapContextProvider';

import '../stylesheets/mapPanel.scss';

const MapPanel = () => {
  const {
    isTileActive,
    singleTileToggle,
    viewModeToggle,
    reportModeToggle,
    connectionModeToggle,
    hideTileElements,
  } = useContext(MapContext);
  const [toggleButton, setToggleButton] = useState('View');
  const {t} = useTranslation();

  const radios = [
    {
      title: t('tileModePrompts.view'),
      name: 'View',
      icon: () => <VisibilityIcon />,
    },
    {
      title: t('tileModePrompts.report'),
      name: 'Report',
      icon: () => <ReportIcon />,
    },
    {
      title: t('tileModePrompts.connection'),
      name: 'Connection',
      icon: () => <SettingsEthernetIcon />,
    },
  ];

  const handleChange = (_, value) => {
    setToggleButton(value);
    switch (value) {
      case 'View':
        viewModeToggle();
        break;
      case 'Report':
        reportModeToggle();
        break;
      case 'Connection':
        connectionModeToggle();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isTileActive && (
        <div className="map-panel__container">
          <div className="map-panel__toggle-container">
            <ToggleButton
              value="check"
              className="map-panel__toggle--back"
              selected={false}
              onChange={() => {
                singleTileToggle(false);
                hideTileElements();
              }}>
              <Tooltip title={t('tileModePrompts.back')}>
                <ArrowBackIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButtonGroup
              className="map-panel__toggle-group"
              value={toggleButton}
              exclusive
              onChange={handleChange}>
              {radios.map(({title, name, icon}, index) => (
                <ToggleButton className="map-panel__toggle--modes" key={index} value={name}>
                  <Tooltip title={title}>{icon()}</Tooltip>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </div>
        </div>
      )}
    </>
  );
};

export default MapPanel;
