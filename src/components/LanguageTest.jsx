import React from 'react';
import {useTranslation} from 'react-i18next';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const lngs = {
  en: {nativeName: 'English'},
  pl: {nativeName: 'Polski'},
};

const LanguageSwitch = () => {
  const {i18n} = useTranslation();

  return (
    <>
      <div>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          {Object.keys(lngs).map(lng => (
            <Button key={lng} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </>
  );
};

export default LanguageSwitch;
