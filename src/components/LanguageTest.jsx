import React from 'react';
import {useTranslation} from 'react-i18next';

const LanguageSwitch = () => {
  const {i18n} = useTranslation();

  const lngs = {
    en: {nativeName: 'English'},
    pl: {nativeName: 'Polski'},
  };

  return (
    <div>
      {Object.keys(lngs).map(lng => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.language === lng ? 'bold' : 'normal',
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}>
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;
