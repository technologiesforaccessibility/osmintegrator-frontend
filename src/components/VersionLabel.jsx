import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import * as pack from '../../package.json';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';

const VersionLabel = () => {
  const {t} = useTranslation();
  const [version, setVersion] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function getVersion() {
      try {
        setErr(false);
        const response = await api.versionList({
          headers: basicHeaders(),
        });
        setVersion(response.data);
      } catch (error) {
        setErr(true);
      }
    }
    getVersion();
  }, []);

  return (
    <>
      {t('version')}
      <span>F: {pack.version}</span>
      {!err && <span>, B: {version}</span>}
    </>
  );
};

export default VersionLabel;
