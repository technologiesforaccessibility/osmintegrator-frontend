import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import Tooltip from '@mui/material/Tooltip';

import '../../stylesheets/authBottomPanel.scss';

const {REACT_APP_CONTACT_FORM} = process.env;

const AuthBottomPanel = ({linkText, link}) => {
  const {t} = useTranslation();

  return (
    <div className="panel-link panel-utils">
      <NavLink to={link}>{linkText}</NavLink>
      <Tooltip title={t('register.reportPrompt')}>
        <a target="_blank" rel="noopener noreferrer" href={REACT_APP_CONTACT_FORM}>
          ?
        </a>
      </Tooltip>
    </div>
  );
};

export default AuthBottomPanel;
