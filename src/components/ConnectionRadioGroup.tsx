import React, {FC, useContext} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import {ConnectionRadio} from '../types/enums';
import {MapContext} from './contexts/MapContextProvider';

const ConnectionRadioGroup: FC = () => {
  const {connectionRadio, setConnectionRadio} = useContext(MapContext);

  const handleChange = (event: any) => {
    setConnectionRadio(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup name="controlled-radio-buttons-group" value={connectionRadio} onChange={handleChange}>
        <FormControlLabel value={ConnectionRadio.ADD} control={<Radio />} label="Nowe połączenie" />
        <FormControlLabel value={ConnectionRadio.EDIT} control={<Radio />} label="Edytuj połączenie dla przystanku" />
      </RadioGroup>
    </FormControl>
  );
};
export default ConnectionRadioGroup;
