import React, {FC, useContext} from 'react';
import Button from '@mui/material/Button';

import {MapContext} from './contexts/MapContextProvider';

const MovedStopHandler: FC = () => {
  const {activeStop, movedStopsState, resetPositionFunction} = useContext(MapContext);

  const saveStopToLocalStorage = () => {
    if (!activeStop) {
      return;
    }
    const newItem = movedStopsState.find(({id}) => id === activeStop.id);
    if (newItem) {
      const storage = localStorage.getItem('moveStopsArray');
      if (storage) {
        try {
          const storageObject = JSON.parse(storage);
          const index = storageObject.findIndex(({id}: {id: string}) => id === activeStop.id);
          console.log({index});
          if (index >= 0) {
            storageObject[index] = {
              id: storageObject[index].id,
              externalId: storageObject[index].externalId,
              position: newItem.position,
            };
            console.log({storageObject});

            localStorage.setItem('moveStopsArray', JSON.stringify(storageObject));
          } else {
            const newArray = storageObject.concat([newItem]);
            localStorage.setItem('moveStopsArray', JSON.stringify(newArray));
          }
        } catch {
          console.log('Wystąpił błąd przy pobieraniu danych');
        }
      } else {
        localStorage.setItem('moveStopsArray', JSON.stringify([newItem]));
      }
    } else {
      console.log('BŁĄD, NIE ZNALEZIONO PRZYSTANKU DO ZAKTUALIZOWANIA');
    }
  };

  const resetPosition = () => {
    if (!activeStop) {
      return;
    }
    if (resetPositionFunction) {
      resetPositionFunction();
    }
    const storage = localStorage.getItem('moveStopsArray');
    if (storage) {
      try {
        const storageObject = JSON.parse(storage);
        const index = storageObject.findIndex(({id}: {id: string}) => id === activeStop.id);
        if (index >= 0) {
          const newArray = storageObject.splice(index, 1);
          localStorage.setItem('moveStopsArray', JSON.stringify(newArray));
        }
      } catch {
        console.log('PROBLEM Z RESETOWANIEM POZYCJI PRZYSTANKU');
      }
    }
  };

  return (
    <div style={{height: '150px', backgroundColor: 'palegreen'}}>
      Panel do zarządzania lokalizacją pinezki
      {activeStop && activeStop.stopType !== 0 ? (
        <>
          <Button
            variant="contained"
            onClick={() => {
              console.log('CLICK');
            }}>
            Dostosuj połączenie
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              saveStopToLocalStorage();
            }}>
            Aktualizuj lokalizację
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              resetPosition();
            }}>
            Przywróć pierwotną lokalizację
          </Button>
        </>
      ) : (
        <p>Kliknij na przystanek ZTM aby włączyć jego przesuwanie</p>
      )}
    </div>
  );
};

export default MovedStopHandler;
