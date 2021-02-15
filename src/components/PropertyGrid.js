import React, {Component} from 'react';
import './propertyGrid.scss';

class PropertyGrid extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const grid = this.props.propertyGrid;
        const newPropertyGrid = Object.entries(grid).map((propertyPair) => ({
            propkey: propertyPair[0],
            propvalue: ((typeof propertyPair[1] === "boolean" || propertyPair[1] === null ) ? JSON.stringify(propertyPair[1]) : propertyPair[1] )
        }));
        return (
            <div>
                <p className="reds">Property window</p>
                <div className="propertyGrid-frame">
                    <p> Add new | Edit | Remove </p>
                    {newPropertyGrid.map((prop, index) => (
                            <div key={index} className="propertyGrid-row">
                                <div className="propertyGrid-key">{prop.propkey}</div>
                                <div className="propertyGrid-value">{prop.propvalue}</div>
                            </div>
                        ))}
                </div>

            </div>
        );
    }
}

export default PropertyGrid;