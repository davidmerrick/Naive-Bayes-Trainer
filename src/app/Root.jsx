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
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Test">Test</Link></li>
                        </ul>

                        <Route exact path="/" component={Classifier} />
                        <Route exact path="/test" component={TestPage} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('app'));

export default Root