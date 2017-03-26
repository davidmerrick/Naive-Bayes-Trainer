import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Constants from '../constants/Constants'
import Endpoints from '../constants/Endpoints'
import { connect } from 'react-redux'
import StoreState from '../constants/StoreState'
import Actions from '../actions/Actions'

@connect(store => {
    return {
        storeState: store.storeState,
        error: store.error,
        textItem: store.textItem
    };
})
class Client extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(Actions.initialize());
    }

    render(){
        let { storeState } = this.props;
        switch(storeState) {
            case StoreState.EMPTY:
                return(
                    <div>
                        <h1>Loading...</h1>
                    </div>
                );
                break;
            case StoreState.READY:
                return (
                    <div>
                        <form action={Endpoints.CLASSIFICATIONS} method="POST">
                            {this.props.textItem.text}
                            <input type="hidden" name="textId" value={this.props.textItem.id}/>
                            <ButtonToolbar>
                                <Button name="option" value={Constants.OPTION_ONE} bsStyle="primary"
                                        type="submit">{Constants.OPTION_ONE}</Button>
                                <Button name="option" value={Constants.OPTION_TWO} bsStyle="primary"
                                        type="submit">{Constants.OPTION_TWO}</Button>
                            </ButtonToolbar>
                        </form>
                    </div>
                );
        }
    }
}

Client.defaultProps = {
    textItem: null
}

export default Client