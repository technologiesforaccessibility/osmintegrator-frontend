import React, {useState} from 'react';
import {Button, IconButton} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {useTranslation} from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import tileUnsigned from '../../assets/unsigned.png';
import tileSignedEditor from '../../assets/signed.png';
import tileApprovedEditor from '../../assets/approved_editor.png';
import tileApprovedSupervisor from '../../assets/approved_supervisor.png';
import tileExported from '../../assets/exported.png';
import stopOSM from '../../assets/angledIcons/angled_black.png';
import stopOSMReport from '../../assets/angledIcons/report_black.png';
import stopOSMReportApprove from '../../assets/angledIcons/report_black_approve.png';
import stopZTM from '../../assets/angledIcons/angled_pink.png';
import stopZTMReport from '../../assets/angledIcons/report_pink.png';
import stopZTMReportApprove from '../../assets/angledIcons/report_pink_approve.png';
import stopZTMOutside from '../../assets/angledIcons/angled_maroon.png';
import stopZTMOutsideReport from '../../assets/angledIcons/report_maroon.png';
import stopZTMOutsideReportApprove from '../../assets/angledIcons/report_maroon_approve.png';
import reportBlueIcon from '../../assets/report_blue.png';
import reportGreenIcon from '../../assets/report_green.png';
import reportGreyIcon from '../../assets/report_grey.png';
import connectionApproved from '../../assets/connection_approved.png';
import connectionNotApproved from '../../assets/connection_not_approved.png';
import '../../stylesheets/legend.scss';

const Legend = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {t} = useTranslation();

  const icons = [
    {src: tileUnsigned, text: t('legend.tileUnsigned')},
    {src: tileSignedEditor, text: t('legend.tileSignedEditor')},
    {src: tileApprovedEditor, text: t('legend.tileApprovedEditor')},
    {src: tileApprovedSupervisor, text: t('legend.tileApprovedSupervisor')},
    {src: tileExported, text: t('legend.tileExported')},
    {src: stopOSM, text: t('legend.stopOSM')},
    {src: stopOSMReport, text: t('legend.stopOSMReport')},
    {src: stopOSMReportApprove, text: t('legend.stopOSMReportApprove')},
    {src: stopZTM, text: t('legend.stopZTM')},
    {src: stopZTMReport, text: t('legend.stopZTMReport')},
    {src: stopZTMReportApprove, text: t('legend.stopZTMReportApprove')},
    {src: stopZTMOutside, text: t('legend.stopZTMOutside')},
    {src: stopZTMOutsideReport, text: t('legend.stopZTMOutsideReport')},
    {src: stopZTMOutsideReportApprove, text: t('legend.stopZTMOutsideReportApprove')},
    {src: reportGreyIcon, text: t('legend.reportNew')},
    {src: reportBlueIcon, text: t('legend.reportActive')},
    {src: reportGreenIcon, text: t('legend.reportInactive')},
    {src: connectionNotApproved, text: t('legend.connectionNew')},
    {src: connectionApproved, text: t('legend.connectionApprove')},
  ];

  const getIcons = icons.map(({src, text}, id) => (
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
        sx={{zIndex: '400', position: 'absolute', bottom: '25px', right: '10px', opacity: '0.8'}}>
        {t('legend.title')}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 40px)',
            maxWidth: '678px',
            bgcolor: 'white',
            borderRadius: '10px',
            boxShadow: 24,
            overflowY: 'auto',
            height: 'calc(100% - 40px)',
            maxHeight: '720px',
          }}>
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
