import React from 'react';

function NameBox({name}) {
    return (
        <div className="d-inline-block management-panel__name-item">
            <div className="">
                {name}
            </div>
        </div>
    );
}

export default NameBox;
