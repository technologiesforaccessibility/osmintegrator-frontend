import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import TabPanel from '../extra/TabContent';
import TileExportOsmChangesTab from './TileExportOsmChangesTab';
import TileExportOsmExportTab from './TileExportOsmExportTab';
import TileExportOsmInfoTab from './TileExportOsmInfoTab';

export interface TileExportModalProps {
  tileId: string;
  open: boolean;
  changes: string | undefined;
  initialComment: string | undefined;
  tags: string[];
  onClose: () => void;
}

const TileExportModal = (props: TileExportModalProps) => {
  const { tileId, open, onClose, changes, tags, initialComment } = props;
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [comment, setComment] = React.useState<string | undefined>(initialComment);
  const { t } = useTranslation();

  const onTabChange = (event: React.SyntheticEvent, selectedTabIndex: number) => {
    setActiveTabIndex(selectedTabIndex);
  };

  const getTags = () => (comment?.trim() ? [`comment=${comment}`].concat(tags) : tags);

  return (
    <Modal open={open}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          minHeight: 550,
          bgcolor: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 3,
        }}>
        <>
          <Tabs onChange={onTabChange} value={activeTabIndex}>
            <Tab label={t('osmExport.exportTab.title')} value={0} />
            <Tab label={t('osmExport.changesTab.title')} value={1} />
            <Tab label={t('osmExport.infoTab.title')} value={2} />
          </Tabs>
          <Button
            onClick={() => {
              onClose();
            }}
            style={{ position: 'absolute', top: '20px', right: '20px' }}
            variant="outlined">
            <CloseIcon color="primary" />
          </Button>
          <TabPanel index={0} value={activeTabIndex}>
            <TileExportOsmExportTab
              tileId={tileId}
              initialComment={comment}
              onCommentChange={setComment}
              onSubmit={onClose}
            />
          </TabPanel>
          <TabPanel index={1} value={activeTabIndex}>
            <TileExportOsmChangesTab tileId={tileId} changes={changes} />
          </TabPanel>
          <TabPanel index={2} value={activeTabIndex}>
            <TileExportOsmInfoTab tags={getTags()} />
          </TabPanel>
        </>
      </Box>
    </Modal>
  );
};

export default TileExportModal;
