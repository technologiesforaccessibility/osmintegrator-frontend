import React, {Component} from 'react';
import MapView from "./MapView";

class DashboardMain extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">OSM Integrator</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group me-2">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Choose tile to work with
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="/">Katowice</a>
                                    <a className="dropdown-item" href="/">Gliwice</a>
                                    <a className="dropdown-item" href="/">Bytom</a>
                                </div>
                            </div>
                            <button type="button" className="btn btn-sm btn-secondary">Save
                            </button>
                            <button type="button" className="btn btn-sm btn-secondary">Edit
                            </button>
                        </div>
                        <button type="button" className="btn btn-sm btn-secondary dropdown-toggle">
                            <span data-feather="calendar"></span>
                            Mode
                        </button>
                    </div>
                </div>
                <div>
                    <div className="forMapView">
                        <MapView canConnectBusStops={this.props.canConnectBusStops} setPropertyGrid={this.props.setPropertyGrid}/>
                    </div>
                </div>


            </main>
        );
    }
}

export default DashboardMain;