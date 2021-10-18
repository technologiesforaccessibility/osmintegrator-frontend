import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import * as pack from '../../package.json';
import api from '../api/apiInstance';
import {noTokenHeaders} from '../config/apiConfig';
import {exception} from '../utilities/exceptionHelper';

const VersionLabel = () => {
  const {t} = useTranslation();
  const [version, setVersion] = useState('');
  const [err, setErr] = useState(false);

  useEffect(() => {
    async function getVersion() {
      try {
        setErr(false);
        const response = await api.versionList({
          headers: noTokenHeaders(),
        });
        setVersion(response.data);
      } catch (error) {
        exception(error);
        setErr(true);
      }
    }
    getVersion();
  }, []);

  return (
    <>
      {t('version')}
      <span>F: {pack.version}</span>
      {!err && version ? <span>, B: {version}</span> : null}
    </>
  );
};

export default VersionLabel;
