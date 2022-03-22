import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type TReportsModalProps = {
  isOpen: boolean;
  data: string;
  onClose: () => void;
};

const ReportsModal: FC<TReportsModalProps> = ({ isOpen, data, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={isOpen}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        <div>
          <h4>{t('sync.stopsUpdated')}</h4>
          {data ? (
            <TextField
              id="outlined-multiline-static"
              label={null}
              multiline
              rows={20}
              defaultValue={data}
              sx={{
                width: '100%',
                margin: '0px 5px',
                bgcolor: 'white',
              }}
              disabled={true}
            />
          ) : (
            <p>{t('sync.noChanges')}</p>
          )}

          <Button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px' }} variant="outlined">
            <CloseIcon color="primary" />
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ReportsModal;
