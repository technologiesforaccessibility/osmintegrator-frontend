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
      tileId: tileId,
    };
  } else if (connection[0].isOsm === false && connection[1].isOsm === true) {
    return {
      osmStopId: connection[1].id.toString(),
      gtfsStopId: connection[0].id.toString(),
      tileId: tileId,
    };
  }
  throw new Error();
};

const generateStopName = stop => {
  let result = stop.name || stop.id;
  if (stop.number) {
    result += ' ' + stop.number;
  }
  if (stop.stopType === 1) return result;

  const refTag = stop.tags.find(x => x.key === 'ref');
  if (refTag) return (result += `,  ref: ${refTag.value || '-'}`);
  return (result += ', ref: -');
};

export {getPosition, generateConnectionData, generateStopName};
