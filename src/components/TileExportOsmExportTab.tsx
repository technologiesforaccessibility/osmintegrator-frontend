import {Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface TileExportOsmExportTabProps {}

const TileExportOsmExportTab = (props: TileExportOsmExportTabProps) => {
  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="column" spacing={1}>
        <Grid item>
          <span>Komentarz</span>
        </Grid>
        <Grid item>
          <TextareaAutosize minRows={6} placeholder="Tutaj możesz dodać komentarz" style={{width: '100%'}} />
        </Grid>
      </Grid>
      <Grid item container direction="column" spacing={1}>
        <Grid item>
          <span>Wprowadź dane logowania do OpenStreetMap</span>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={4}>
            <span>Email lub użytkownik:</span>
          </Grid>
          <Grid item>
            <input></input>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={4}>
            <span>Hasło:</span>
          </Grid>
          <Grid item>
            <input></input>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between">
        <Grid item>
          <div>Zmiany zostaną wysłane do OSM w twoim imieniu.</div>
          <div>Przeczytaj więcej na temat wysyłania danych do OSM.</div>
        </Grid>
        <Grid item>
          <Button variant="contained">Wyślij</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TileExportOsmExportTab;
