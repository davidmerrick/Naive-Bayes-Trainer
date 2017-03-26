import React from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Constants from '../constants/Constants'
import Endpoints from '../constants/Endpoints'

class Client extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <form action={Endpoints.CLASSIFICATIONS} method="POST">
                    {this.props.tweetText}
                    <input type="hidden" name="tweet-text" value={this.props.tweetText} />
                    <ButtonToolbar>
                        <Button name="option" value={Constants.OPTION_ONE} bsStyle="primary" type="submit">{Constants.OPTION_ONE}</Button>
                        <Button name="option" value={Constants.OPTION_TWO} bsStyle="primary" type="submit">{Constants.OPTION_TWO}</Button>
                    </ButtonToolbar>
                </form>
            </div>
        );
    }
}

Client.defaultProps = {
    tweetText: "Trump Tweet here"
}


ReactDOM.render(<Client />, document.getElementById('app'));