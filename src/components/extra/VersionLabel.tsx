import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectVersion } from 'redux/selectors/authSelector';

const VersionLabel = () => {
  const { t } = useTranslation();

  const version = useSelector(selectVersion);
  const packageVersion = process.env.REACT_APP_VERSION;

  return (
    <>
      {t('version')}
      <span>{packageVersion}</span>
      {version && <span> ({version}</span>})
    </>
  );
};

export default VersionLabel;
