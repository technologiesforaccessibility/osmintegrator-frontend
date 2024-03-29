import { Button } from '@mui/material';
import { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

const CookiesBar: FC = () => {
  const [cookies, setCookie] = useCookies(['cookies_info']);
  const { t } = useTranslation();

  const acceptCookies = () => {
    setCookie('cookies_info', 'true', { path: '/' });
  };
  return (
    <>
      {!cookies.cookies_info && (
        <div className="fixed-bottom pt-3 pb-4 bg-white shadow-lg">
          <div className="container">
            <p className="h6"> {t('cookies.title')}</p>
            <p className="small ">{t('cookies.content')}</p>
            <Button color="primary" variant="contained" onClick={acceptCookies}>
              {t('cookies.button')}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesBar;
