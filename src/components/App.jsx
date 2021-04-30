import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Auth from './Auth';
import '../stylesheets/app.scss';
import MapContextProvider from './contexts/MapContextProvider';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <MapContextProvider>
                        <Route path={['/auth', '/Account']} component={Auth} />
                        <Route path={['/profile', '/']} component={Dashboard} />
                    </MapContextProvider>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;