const getPosition = (osmStop, gtfsStop) => {
  return [
    [osmStop.lat, osmStop.lon],
    [gtfsStop.lat, gtfsStop.lon],
  ];
};

const generateConnectionData = (connection, tileId) => {
  if (connection[0].isOsm === true && connection[1].isOsm === false) {
    return {
      osmStopId: connection[0].id.toString(),
      gtfsStopId: connection[1].id.toString(),
      tileId: tileId
    };
  } else if (connection[0].isOsm === false && connection[1].isOsm === true) {
    return {
      osmStopId: connection[1].id.toString(),
      gtfsStopId: connection[0].id.toString(),
      tileId: tileId
    };
  }
  throw(new Error());
};

const generateStopName = (id, name, number) => {
  if (name) {
    return `${name} ${number || ''}`;
  } else {
    return `${id}`;
  }
};

export {getPosition, generateConnectionData, generateStopName};
