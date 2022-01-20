import {Button, Grid, TextField} from '@mui/material';
import {useTranslation} from 'react-i18next';

interface TileExportOsmChangesTabProps {
  tileId: string;
  changes: string | undefined;
}

const TileExportOsmChangesTab = (props: TileExportOsmChangesTabProps) => {
  const {changes} = props;
  const {t} = useTranslation();

  const downloadFile = () => {
    // TO DO: implement
  };

  return (
    <Grid container direction="column" sx={{pt: 3}}>
      <Grid item>
        <TextField multiline value={changes} disabled rows={15} style={{width: '100%'}} />
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
