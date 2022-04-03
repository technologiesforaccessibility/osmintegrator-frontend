import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Trans, useTranslation } from 'react-i18next';

interface TileExportOsmInfoTabProps {
  tags: string[];
}

const TileExportOsmInfoTab = (props: TileExportOsmInfoTabProps) => {
  const { tags } = props;
  const { t } = useTranslation();

  const createTextBody = () => tags.reduce((prev, curr) => `${prev}\n${curr};`);

  return (
    <Grid container direction="column" spacing={2} sx={{ pt: 1 }}>
      <Grid item container direction="column">
        <Grid item>
          <h5>{t('osmExport.infoTab.credentials.header')}</h5>
        </Grid>
        <Grid item>
          <Trans>
            <span dangerouslySetInnerHTML={{ __html: t('osmExport.infoTab.credentials.description') }}></span>
          </Trans>
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <h5>{t('osmExport.infoTab.tags.header')}</h5>
        </Grid>
        <Grid item>
          <TextField multiline value={createTextBody()} rows={8} disabled style={{ width: '100%' }} />
        </Grid>
      </Grid>
      <Grid item container direction="column">
        <Grid item>
          <h5>{t('osmExport.infoTab.wiki.header')}</h5>
        </Grid>
        <Grid item>
          <a href="https://wiki.openstreetmap.org/wiki/Automated_edits/luktar/OsmIntegrator_-_fixing_stop_signs_for_blind">
            https://wiki.openstreetmap.org/wiki/Automated_edits/luktar/OsmIntegrator_-_fixing_stop_signs_for_blind
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TileExportOsmInfoTab;
