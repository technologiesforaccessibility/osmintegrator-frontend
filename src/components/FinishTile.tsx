import React, {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {MapContext} from './contexts/MapContextProvider';
import {basicHeaders} from '../config/apiConfig';
import api from '../api/apiInstance';
import {NotificationActions} from '../redux/actions/notificationActions';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {roles} from './../utilities/constants';

import './../stylesheets/finishTile.scss';

const FinishTile = () => {
  const {t} = useTranslation();
  const [accept, setAccept] = useState(false);
  const [areDisabledConfirmationButtons, setAreDisabledConfirmationButtons] = useState(false);
  const {activeTile, closeTile} = useContext(MapContext);
  const dispatch = useDispatch();
  const authRoles = useSelector(selectLoggedInUserRoles);

  const approveTile = async () => {
    setAreDisabledConfirmationButtons(true);

    try {
      await api.tileApproveUpdate(activeTile.id, {headers: basicHeaders()});
      closeTile();
      dispatch(NotificationActions.success(t('finishTile.successMessage')));
    } catch (e) {
      dispatch(NotificationActions.error(t('finishTile.failMessage')));
    }
  };

  return (
    <>
      <div className="finish-tile__confirmation-area">
        {accept && (
          <>
            <div>
              <p className="finish-tile__confirmation-title">{t('finishTile.confirmation')}</p>
            </div>
            <div className="finish-tile__buttons">
              <Button
                className="finish-tile__decision-button"
                type="submit"
                variant="contained"
                disabled={areDisabledConfirmationButtons}
                onClick={() => approveTile()}>
                {t('buttons.send')}
              </Button>
              <Button
                className="finish-tile__decision-button"
                variant="contained"
                disabled={areDisabledConfirmationButtons}
                onClick={() => setAccept(false)}>
                {t('buttons.cancel')}
              </Button>
            </div>
          </>
        )}
      </div>

      <Button
        className="finish-tile__main-button"
        variant="contained"
        disabled={accept}
        onClick={() => setAccept(true)}>
        {authRoles.includes(roles.SUPERVISOR) ? t('finishTile.supervisorMainButton') : t('finishTile.editorMainButton')}
      </Button>
    </>
  );
};

export default FinishTile;
