import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import FileDownload from 'js-file-download';
import { basicHeaders } from '../config/apiConfig';
import { exception } from '../utilities/exceptionHelper';

interface TileExportOsmChangesTabProps {
  tileId: string;
  changes: string | undefined;
}

const TileExportOsmChangesTab = (props: TileExportOsmChangesTabProps) => {
  const { changes, tileId } = props;
  const { t } = useTranslation();

  const downloadFile = async () => {
    try {
      const response = await axios.get(`/api/tiles/${tileId}/export/osc`, {
        responseType: 'blob',
        headers: basicHeaders(),
      });
      FileDownload(response.data, 'osmchange.osc', 'text/xml');
    } catch (ex) {
      exception(ex);
    }
  };

  return (
    <Grid container direction="column" sx={{ pt: 3 }}>
      <Grid item>
        <TextField multiline value={changes} disabled rows={15} style={{ width: '100%' }} />
      </Grid>
      <Grid item alignSelf="end">
        <Button variant="text" onClick={() => downloadFile()}>
          {t('osmExport.changesTab.download')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default TileExportOsmChangesTab;
