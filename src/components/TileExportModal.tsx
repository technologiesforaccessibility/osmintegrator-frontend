import React from 'react';
import {Box, Button, Modal, Tab, Tabs} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TabPanel from './TabContent';
import TileExportOsmExportTab from './TileExportOsmExportTab';
import TileExportOsmChangesTab from './TileExportOsmChangesTab';
import TileExportOsmInfoTab from './TileExportOsmInfoTab';

interface TileExportModalProps {
  open: boolean;
  onCancel: Function;
}

const TileExportModal = (props: TileExportModalProps) => {
  const {open, onCancel} = props;

  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, selectedTabIndex: number) => {
    setActiveTabIndex(selectedTabIndex);
  };

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: 600,
          minHeight: 500,
          bgcolor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
        <Tabs onChange={handleChange}>
          <Tab label="Export" />
          <Tab label="Zmiany" />
          <Tab label="Info" />
        </Tabs>
        <Button
          onClick={() => {
            onCancel();
          }}
          style={{position: 'absolute', top: '20px', right: '20px'}}
          variant="outlined">
          <CloseIcon color="primary" />
        </Button>
        <TabPanel index={0} value={activeTabIndex}>
          <TileExportOsmExportTab />
        </TabPanel>
        <TabPanel index={1} value={activeTabIndex}>
          <TileExportOsmChangesTab />
        </TabPanel>
        <TabPanel index={2} value={activeTabIndex}>
          <TileExportOsmInfoTab />
        </TabPanel>
      </Box>
    </Modal>
  );
};

export default TileExportModal;
