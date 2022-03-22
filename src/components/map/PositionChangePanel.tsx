import { Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const PositionChangePanel: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="position-change-panel">
      <Typography variant="subtitle1" gutterBottom>
        {t('pan.header')}
      </Typography>
      <Typography variant="subtitle2">{t('pan.selectPrompt')}</Typography>
    </div>
  );
};

export default PositionChangePanel;
