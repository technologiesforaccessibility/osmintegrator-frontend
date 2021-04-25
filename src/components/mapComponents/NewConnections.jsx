import React, {Fragment} from 'react';
import {Polyline} from "react-leaflet";

import colors from '../../stylesheets/colors.module.scss';


const NewConnections = ({connections, showSingleTile}) => {
    return (
        <Fragment>
            { (showSingleTile && connections !== []) && connections.map((connection, index) => (
                    <Polyline
                        key={index}
                        pathOptions={{color: colors.colorConnectionNew}}
                        positions={[connection[0].coordinates, connection[1].coordinates]}
                    />
                ))}
        </Fragment>
    )
}

export default NewConnections;