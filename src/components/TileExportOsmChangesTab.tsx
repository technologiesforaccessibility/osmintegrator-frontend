import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';

interface TileExportOsmChangesTabProps {}

const TileExportOsmChangesTab = (props: TileExportOsmChangesTabProps) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <TextField multiline rows={15} sx={{width: '100%'}} disabled={true} />
      </Grid>
    </Grid>
  );
};

export default TileExportOsmChangesTab;
