import {useState} from 'react';
import {useTranslation} from 'react-i18next';

import {Button, Checkbox, FormControlLabel, FormGroup} from '@mui/material';
import '../stylesheets/welcomeModal.scss';

const {REACT_APP_USER_MANUAL} = process.env;

const WelcomeModal = ({handleClose}) => {
  const [isChecked, setChecked] = useState(false);
  const {t} = useTranslation();

  const handleChange = event => {
    setChecked(event.target.checked);
  };
  return (
    <div className="welcome-modal">
      <h3 className="welcome-modal__title">{t('welcomeModal.title')}</h3>
      <p className="welcome-modal__content">{t('welcomeModal.content')}</p>
      <a
        href={REACT_APP_USER_MANUAL}
        rel="noopener noreferrer"
        target="_blank"
        className="welcome-modal__manual">
        <Button color="primary" variant="outlined" clickable>
          {t('welcomeModal.button')}
        </Button>
      </a>
      <FormGroup className="welcome-modal__form">
        <FormControlLabel
          control={<Checkbox checked={isChecked} onChange={handleChange} size="small" />}
          label={t('welcomeModal.checkbox')}
        />
        <Button variant="contained" onClick={() => handleClose(isChecked)}>
          {t('welcomeModal.hide')}
        </Button>
      </FormGroup>
    </div>
  );
};

export default WelcomeModal;
