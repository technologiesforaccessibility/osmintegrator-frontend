import { useTranslation } from 'react-i18next';

import { useHistory } from 'react-router-dom';
import '../../stylesheets/authBottomPanel.scss';
import { Button, ButtonGroup } from '@mui/material';
import { FC } from 'react';

const { REACT_APP_CONTACT_FORM } = process.env;

type TAuthBottomPanelProps = {
  linkText: string;
  link: string;
};

const AuthBottomPanel: FC<TAuthBottomPanelProps> = ({ linkText, link }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div className="panel-link panel-utils">
      <ButtonGroup
        className="panel-link__buttons"
        size="small"
        variant="text"
        aria-label="outlined primary button group">
        <Button onClick={() => history.push(link)}>{linkText}</Button>
        <Button onClick={() => window.open(REACT_APP_CONTACT_FORM, '_blank', 'noopener,noreferrer')}>
          {t('register.reportPrompt')}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default AuthBottomPanel;
