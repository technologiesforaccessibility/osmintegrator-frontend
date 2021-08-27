import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import './../stylesheets/finishTile.scss';

const FinishTile = () => {
  const {t} = useTranslation();
  const [accept, setAccept] = useState(false);

  return (
    <div className="finish-tile__box">
      <div className="finish-tile__confirmation-area">
        {accept && (
          <>
            <p className="finish-tile__confirmation-title">{t('finishTile.confirmation')}</p>
            <div className="finish-tile__buttons">
              <Button
                className="finish-tile__decision-button"
                type="submit"
                variant="contained"
                onClick={() => setAccept(true)}>
                {t('buttons.send')}
              </Button>
              <Button className="finish-tile__decision-button" variant="contained" onClick={() => setAccept(false)}>
                {t('buttons.cancel')}
              </Button>
            </div>
          </>
        )}
      </div>
      <Button className="finish-tile__main-button" variant="contained" disabled={accept} onClick={() => setAccept(true)}>
        {t('finishTile.mainButton')}
      </Button>
    </div>
  );
};

export default FinishTile;
