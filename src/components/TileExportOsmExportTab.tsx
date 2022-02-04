import {AccountCircle} from '@mui/icons-material';
import {Backdrop, Button, CircularProgress, Grid, InputAdornment, TextField} from '@mui/material';
import {Formik} from 'formik';
import React from 'react';
import {useDispatch} from 'react-redux';
import api from '../api/apiInstance';
import {basicHeaders} from '../config/apiConfig';
import {NotificationActions} from '../redux/actions/notificationActions';
import {ExportSchema} from '../utilities/validationSchema';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {useTranslation} from 'react-i18next';
import {exception} from '../utilities/exceptionHelper';

interface TileExportOsmExportTabProps {
  tileId: string;
  initialComment: string | undefined;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
}

const TileExportOsmExportTab = (props: TileExportOsmExportTabProps) => {
  const {tileId, initialComment, onCommentChange, onSubmit} = props;
  const [isExporting, setExporting] = React.useState<boolean>(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onExport = async (comment: string, email: string, password: string) => {
    setExporting(true);

    try {
      await api.tilesExportCreate(tileId, {comment, email, password}, {headers: basicHeaders()});

      dispatch(NotificationActions.success(t('osmExport.exportTab.dataExported')));

      onSubmit();
    } catch (error) {
      exception(error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
      <Backdrop open={isExporting}>
        <CircularProgress size={100} />
      </Backdrop>
      <Formik
        onSubmit={({comment, email, password}) => {
          onExport(comment, email, password);
        }}
        initialValues={{
          comment: initialComment ?? '',
          email: '',
          password: '',
        }}
        validationSchema={ExportSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <form className="content-container" onSubmit={handleSubmit} noValidate>
            <Grid container direction="column" spacing={3} sx={{pt: 2}}>
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <h5>{t('osmExport.exportTab.comment.header')}</h5>
                </Grid>
                <Grid item>
                  <TextField
                    id="comment"
                    type="text"
                    multiline
                    value={values.comment}
                    fullWidth
                    disabled={isExporting}
                    onChange={event => {
                      handleChange('comment')(event);
                      onCommentChange(event.target.value);
                    }}
                    rows={5}
                    helperText={errors.comment && touched.comment && errors.comment}
                  />
                </Grid>
              </Grid>
              <Grid item container direction="column" spacing={1}>
                <Grid item>
                  <h5>{t('osmExport.exportTab.credentials.header')}</h5>
                </Grid>
                <Grid item container direction="row">
                  <Grid item xs={4}>
                    {t('osmExport.exportTab.credentials.email.label')}
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      id="email"
                      type="text"
                      value={values.email}
                      fullWidth
                      variant={'standard'}
                      disabled={isExporting}
                      onChange={handleChange('email')}
                      helperText={errors.email && touched.email && errors.email}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid item container direction="row">
                  <Grid item xs={4}>
                    {t('osmExport.exportTab.credentials.password.label')}
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      name="password"
                      value={values.password}
                      fullWidth
                      variant={'standard'}
                      disabled={isExporting}
                      onChange={handleChange('password')}
                      type="password"
                      helperText={errors.password && touched.password && errors.password}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container direction="row" justifyContent="space-between">
                <Grid item xs={8} sx={{fontSize: 14}}>
                  {t('osmExport.exportTab.info')}
                </Grid>
                <Grid item>
                  <Button variant="contained" disabled={isExporting} type="submit">
                    {t('osmExport.exportTab.submit')}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default TileExportOsmExportTab;
