import {useState, useContext} from 'react';
import Button from '@material-ui/core/Button';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import {MapContext} from './contexts/MapContextProvider';
import {basicHeaders} from '../config/apiConfig';
import api from '../api/apiInstance';
import {NotificationActions} from '../redux/actions/notificationActions';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {roles} from './../utilities/constants';
import { exception } from '../utilities/exceptionHelper';

import './../stylesheets/finishTile.scss';

const FinishTile = () => {
  const {t} = useTranslation();
  const [areDisabledConfirmationButtons, setAreDisabledConfirmationButtons] = useState(false);
  const {activeTile, closeTile} = useContext(MapContext);
  const dispatch = useDispatch();
  const authRoles = useSelector(selectLoggedInUserRoles);
  const [openModal, setOpenModal] = useState(false);

  const approveTile = async () => {
    setAreDisabledConfirmationButtons(true);

    try {
      await api.tileApproveUpdate(activeTile.id, {headers: basicHeaders()});
      closeTile();
      dispatch(NotificationActions.success(t('finishTile.successMessage')));
    } catch (error) {
      exception(error);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        className="finish-tile__main-button"
        variant="contained"
        disabled={openModal}
        onClick={() => {
          setOpenModal(true);
        }}>
        {authRoles.includes(roles.SUPERVISOR) ? t('finishTile.supervisorMainButton') : t('finishTile.editorMainButton')}
      </Button>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{t('finishTile.confirmation')}</DialogTitle>
        <DialogContent>
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
              onClick={() => setOpenModal(false)}>
              {t('buttons.cancel')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishTile;
