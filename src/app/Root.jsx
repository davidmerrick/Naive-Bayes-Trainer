import React from "react";
import {Provider} from "react-redux";
import Store from "../stores/Store";
import Classifier from "../components/Classifier.jsx";
import TestPage from "../components/TestPage.jsx";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import ReactDOM from "react-dom";

class Root extends React.Component {
    render(){
        return(
            <Provider store={Store}>
                <Router>
                    <div>
                        <ul id="main-nav">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Test">Test</Link></li>
                        </ul>
                        <div className="container-fluid" id="app-container">
                            <Route exact path="/" component={Classifier} />
                            <Route exact path="/test" component={TestPage} />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));

export default Root