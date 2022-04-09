import './legend.scss';

import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import gtfsStop from 'assets/angledIcons/gtfs_stop.png';
import gtfsStopReport from 'assets/angledIcons/gtfs_stop_report.png';
import gtfsStopReportApproved from 'assets/angledIcons/gtfs_stop_report_approved.png';
import osmStop from 'assets/angledIcons/osm_stop.png';
import osmStopReport from 'assets/angledIcons/osm_stop_report.png';
import osmStopReportApproved from 'assets/angledIcons/osm_stop_report_approved.png';
import osmStopReportApprovedOutside from 'assets/angledIcons/osm_stop_report_approved-out.png';
import osmStopReportOutside from 'assets/angledIcons/osm_stop_report-out.png';
import osmStopOutside from 'assets/angledIcons/osm_stop-out.png';
import tileCompleted from 'assets/completed.png';
import connectionExported from 'assets/connection_exported.png';
import connectionExportedAndImported from 'assets/connection_exported_and_imported.png';
import connectionNotCreated from 'assets/connection_not_created.png';
import connectionNotExported from 'assets/connection_not_exported.png';
import reportBlueIcon from 'assets/report_blue.png';
import reportGrayIcon from 'assets/report_gray.png';
import reportGreenIcon from 'assets/report_green.png';
import tileSigned from 'assets/signed.png';
import tileUnsigned from 'assets/unsigned.png';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Legend = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();

  const icons = [
    { src: tileUnsigned, text: t('legend.tileUnsigned') },
    { src: tileSigned, text: t('legend.tileSigned') },
    { src: tileCompleted, text: t('legend.tileCompleted') },
    { src: osmStop, text: t('legend.stopOSM') },
    { src: osmStopReport, text: t('legend.stopOSMReport') },
    { src: osmStopReportApproved, text: t('legend.stopOSMReportApprove') },
    { src: gtfsStop, text: t('legend.stopZTM') },
    { src: gtfsStopReport, text: t('legend.stopZTMReport') },
    { src: gtfsStopReportApproved, text: t('legend.stopZTMReportApprove') },
    { src: osmStopOutside, text: t('legend.stopOsmOutside') },
    { src: osmStopReportOutside, text: t('legend.stopOsmOutsideReport') },
    { src: osmStopReportApprovedOutside, text: t('legend.stopOsmOutsideReportApprove') },
    { src: reportGrayIcon, text: t('legend.reportNew') },
    { src: reportBlueIcon, text: t('legend.reportActive') },
    { src: reportGreenIcon, text: t('legend.reportInactive') },
    { src: connectionNotCreated, text: t('legend.connectionNotCreated') },
    { src: connectionNotExported, text: t('legend.connectionNotExported') },
    { src: connectionExported, text: t('legend.connectionExported') },
    { src: connectionExportedAndImported, text: t('legend.connectionExportedAndImported') },
  ];

  const getIcons = icons.map(({ src, text }, id) => (
    <li className="legend__row" key={text + id}>
      <span className="legend__icon">
        <img src={src} alt={text} />
      </span>
      <span className="legend__description">{text}</span>
    </li>
  ));
  return (
    <>
      <Button
        size="small"
        variant="contained"
        onClick={handleOpen}
        sx={{ zIndex: '400', position: 'absolute', bottom: '25px', right: '10px', opacity: '0.8' }}>
        {t('legend.title')}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="legend-wrapper" sx={{ boxShadow: 24 }}>
          <div className="legend">
            <div className="legend__close">
              <IconButton onClick={handleClose} color="primary">
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className="legend__title">{t('legend.title')}</h2>
            <ul className="legend__content">{getIcons}</ul>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Legend;
