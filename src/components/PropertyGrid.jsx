import React, {useState} from 'react';

import '../stylesheets/propertyGrid.scss';

const PropertyGrid = ({propertyGrid, updatePropertyGrid}) => {
    const grid = propertyGrid;
    const gridEntries = [];
    if (grid !== null) {
        const entries = Object.entries(grid);
        for (const [key, value] of entries) {
            gridEntries.push(
                <div className="propertyGrid-row">
                    <div className="propertyGrid-key">{key}</div>
                    <div className="propertyGrid-value">
                        {typeof value === 'boolean' || value === null
                            ? JSON.stringify(value)
                            : value}
                    </div>
                </div>,
            );
        }
    }

    const [visibleNewProperty, setVisibleNewProperty] = useState(false);
    const [newProp, setNewProp] = useState('');
    const [newValue, setNewValue] = useState('');
    const [showMergeMessage, setShowMergeMessage] = useState(false);

    function updateProp(e) {
        setNewProp(e.target.value);
    }

    function updateValue(e) {
        setNewValue(e.target.value);
    }

    function mergePropList(e, grid) {
        console.log('Merge');
        e.preventDefault();
        let newGrid = [...grid];
        if (newGrid.hasOwnProperty(newGrid)) {
            console.log('Prop exists');
            setShowMergeMessage(true);
        } else {
            console.log('Prop doesnt exist');
            newGrid[newProp] = newValue;
            updatePropertyGrid(newGrid);
        }
    }

    return (
        <div>
            <div className="propertyGrid-frame">
                <p>
                    <span onClick={() => setVisibleNewProperty(true)}>
                        Add new
                    </span>{' '}
                    |<span>Edit</span> |<span>Remove</span>
                </p>
                {gridEntries}
                {visibleNewProperty && (
                    <form className="propertyGrid-row">
                        <input
                            className="propertyGrid-key"
                            placeholder="New tag"
                            onChange={updateProp}
                        />
                        <input
                            className="propertyGrid-value"
                            placeholder="New value"
                            onChange={updateValue}
                        />
                        <button onClick={e => mergePropList(grid)}>Save</button>
                        {showMergeMessage && (
                            <p>You cannot add existing property as new</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};
export default PropertyGrid;
