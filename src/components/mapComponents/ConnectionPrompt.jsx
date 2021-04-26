import React from 'react';

import '../../stylesheets/connectionPrompt.scss'

const ConnectionPrompt = ({names}) => {

    return (
        <div className="connection-prompt__wrapper">
            Chosen stops for connection
            <label className="connection-prompt__label" >{names.length >0
            ? names[0]
            : '...'
            }</label>
            <label className="connection-prompt__label" > Bus stop name 2</label>

            <button>Save</button>
            <button>Cancel</button>
        </div>
    )
}

export default ConnectionPrompt;