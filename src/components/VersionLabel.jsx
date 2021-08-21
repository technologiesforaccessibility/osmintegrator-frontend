import React from 'react';
import {useTranslation} from 'react-i18next';
import * as pack from '../../package.json';

const VersionLabel = () => {
  const {t} = useTranslation();

  return (
    <>
      {t('version')}
      {pack.version}
    </>
  );
};

export default VersionLabel;
