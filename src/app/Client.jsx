import React from "react";
import {Provider} from "react-redux";
import Store from "../stores/Store";
import App from "../components/App.jsx";
import ReactDOM from "react-dom";

class Client extends React.Component {
    render(){
        return(
            <Provider store={Store}>
                <App />
            </Provider>
        );
    }
}

ReactDOM.render(<Client />, document.getElementById('app'));

export default Client