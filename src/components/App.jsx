import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import Constants from "../constants/Constants";
import {connect} from "react-redux";
import StoreState from "../constants/StoreState";
import Actions from "../actions/Actions";

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

    handleButtonClick(option){
        this.props.dispatch(Actions.submitData(this.props.textItem, option));
    }

    render(){
        let { storeState } = this.props;
        switch(storeState) {
            case StoreState.LOADING:
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
                        {this.props.textItem.text}
                        <ButtonToolbar>
                            <Button
                                bsStyle="primary"
                                onClick={() => this.handleButtonClick(Constants.OPTION_ONE)}
                            >
                                    {Constants.OPTION_ONE}
                            </Button>
                            <Button
                                bsStyle="primary"
                                onClick={() => this.handleButtonClick(Constants.OPTION_TWO)}
                            >
                                    {Constants.OPTION_TWO}
                            </Button>
                        </ButtonToolbar>
                    </div>
                );
        }
    }
}

Client.defaultProps = {
    textItem: null
}

export default Client