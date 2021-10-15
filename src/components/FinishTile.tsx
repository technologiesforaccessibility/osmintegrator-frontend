import {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import {MapContext} from './contexts/MapContextProvider';
import {basicHeaders} from '../config/apiConfig';
import api from '../api/apiInstance';
import {NotificationActions} from '../redux/actions/notificationActions';
import {selectLoggedInUserRoles} from './../redux/selectors/authSelector';
import {roles} from './../utilities/constants';
import {exception} from '../utilities/exceptionHelper';

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

  const submitButtonText = () => {
    if (authRoles.includes(roles.EDITOR) && !activeTile.approvedByEditor) {
      return t('finishTile.editorMainButton');
    }
    return t('finishTile.supervisorMainButton');
  };

  const approveText = () => {
    if (authRoles.includes(roles.EDITOR) && !activeTile.approvedByEditor) {
      return t('finishTile.editorConfirmation');
    }
    return t('finishTile.supervisorConfirmation');
  };

  return (
    <>
      {((authRoles.includes(roles.SUPERVISOR) && activeTile.approvedByEditor) ||
        (authRoles.includes(roles.EDITOR) && !activeTile.approvedByEditor)) && (
        <Button
          className="finish-tile__main-button"
          variant="contained"
          disabled={openModal}
          onClick={() => {
            setOpenModal(true);
          }}>
          {submitButtonText()}
        </Button>
      )}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>{approveText()}</DialogTitle>
        <DialogContent>
          <div className="finish-tile__buttons">
            <Button
              className="finish-tile__decision-button"
              variant="contained"
              disabled={areDisabledConfirmationButtons}
              onClick={() => setOpenModal(false)}>
              {t('buttons.cancel')}
            </Button>
            <Button
              className="finish-tile__decision-button"
              type="submit"
              color="primary"
              variant="contained"
              disabled={areDisabledConfirmationButtons}
              onClick={() => approveTile()}>
              {t('buttons.send')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishTile;
