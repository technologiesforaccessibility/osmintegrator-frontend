import React, {Component} from 'react';
import './propertyGrid.scss';

class PropertyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: [
                {propkey: "stop", propvalue: "Katowice Dworzec fsdjlfdsjlfsd fjdslfdsflsd lfsdfjsldf"},
                {propkey: "city", propvalue: "Katowice"},
                {propkey: "specialID fjsklfasdjkf fldkjfsldf", propvalue: "4"}
            ]
        }
    }

    render() {
        return (
            <div>
                <p className="reds">HEHEHE</p>
                <div className="propertyGrid-frame">
                    <p> Add new | Edit | Remove </p>
                    {this.state.properties
                        .map((prop, index) => (
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