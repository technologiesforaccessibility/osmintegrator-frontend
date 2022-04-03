import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ConnectionRadio } from 'types/enums';

import { MapContext } from '../contexts/MapContextProvider';

const ConnectionRadioGroup: FC = () => {
  const { connectionRadio, setConnectionRadio, setConnectionData, setActiveStop } = useContext(MapContext);
  const { t } = useTranslation();

  const handleChange = (event: any) => {
    setConnectionRadio(event.target.value);
    setConnectionData([]);
    setActiveStop(null);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name="controlled-radio-buttons-group" value={connectionRadio} onChange={handleChange}>
        <FormControlLabel
          value={ConnectionRadio.ADD}
          control={<Radio />}
          label={t('connectionRadioGroup.addLabel') as string}
        />
        <FormControlLabel
          value={ConnectionRadio.EDIT}
          control={<Radio />}
          label={t('connectionRadioGroup.editLabel') as string}
        />
      </RadioGroup>
    </FormControl>
  );
};
export default ConnectionRadioGroup;
