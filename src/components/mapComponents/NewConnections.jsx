import React, {Fragment} from 'react';
import {Polyline} from "react-leaflet";

import colors from '../../stylesheets/colors.module.scss';


const NewConnections = ({connections}) => {
    return (
        <Fragment>
            {connections !== [] && connections.map(({coordinates}, index) => (
                    <Polyline
                        key={index}
                        pathOptions={{color: colors.colorConnectionNew}}
                        positions={coordinates}
                    />
                ))}
        </Fragment>
    )
}

export default NewConnections;