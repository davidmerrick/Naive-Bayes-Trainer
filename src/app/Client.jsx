import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'
import Constants from '../constants/Constants'

class Client extends React.Component {
    render(){
        return(
            <div>
                <div>
                    The text will go here.
                </div>
                <Button bsStyle="primary">{Constants.OPTION_ONE}</Button>    <Button bsStyle="primary">{Constants.OPTION_TWO}</Button>
            </div>
        );
    }
}

ReactDOM.render(<Client />, document.getElementById('app'));