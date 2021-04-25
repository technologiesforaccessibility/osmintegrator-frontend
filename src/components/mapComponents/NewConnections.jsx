import React, {Fragment} from 'react';
import {Polyline} from "react-leaflet";

import colors from '../../stylesheets/colors.module.scss';


const NewConnections = ({polylines}) => {
    return (
        <Fragment>
            {polylines.map(item => (
                    <Polyline
                        key={item.newPolylineStartPoint}
                        pathOptions={{color: colors.colorConnectionNew}}
                        positions={item}
                    />
                ))}
        </Fragment>
    )
}

export default NewConnections;