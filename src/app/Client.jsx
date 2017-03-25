import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'

class Client extends React.Component {
    render(){
        return(
            <div>
                <div>
                    The text will go here.
                </div>
                <Button bsStyle="primary">Option 1</Button>    <Button bsStyle="primary">Option 2</Button>
            </div>
        );
    }
}

ReactDOM.render(<Client />, document.getElementById('app'));