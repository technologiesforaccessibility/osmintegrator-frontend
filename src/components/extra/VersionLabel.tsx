import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectVersion } from 'redux/selectors/authSelector';

import * as pack from '../../../package.json';

const VersionLabel = () => {
  const { t } = useTranslation();

  const version = useSelector(selectVersion);

  return (
    <>
      {t('version')}
      <span>{pack.version}</span>
      {version && <span> ({version}</span>})
    </>
  );
};

export default VersionLabel;
