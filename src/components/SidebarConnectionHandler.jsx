import {useContext} from 'react';

import {MapContext} from './contexts/MapContextProvider';

const SidebarConnectionHandler = () => {
  const {connectedStopPair} = useContext(MapContext);
  return (
    <div>Połączony z {connectedStopPair.connectedStop.name}</div>
    // Approve connection when supervisor
    // Delete connection when supervisor or editor
  );
};

export default SidebarConnectionHandler;
