import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

type TConfirmPopupProps = {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onClick: () => void;
};

const ConfirmPopup: FC<TConfirmPopupProps> = ({ isOpen, text, onClose, onClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClick();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent style={{ marginTop: '0.75rem' }}>
        <Typography>{text}</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="info" variant="contained" onClick={onClose}>
          {t('buttons.cancel')}
        </Button>
        <Button color="primary" variant="contained" onClick={handleClick}>
          {t('buttons.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmPopup;
