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

    getButtons(){
        let buttons = [];
        Constants.OPTIONS.forEach(option => {
            let newButton = <Button bsStyle="primary" onClick={() => this.handleButtonClick(option.value)}>
                {option.anchorText}
            </Button>;
            buttons.push(newButton);
        });
        return buttons;
    }

    render(){
        let { storeState } = this.props;
        switch(storeState) {
            case StoreState.LOADING:
                return null;
                break;
            case StoreState.EMPTY:
                return(
                    <div>
                        <h1>Loading...</h1>
                    </div>
                );
                break;
            case StoreState.READY:
                return (
                    <div className="container-fluid" id="app-container">
                        <h1>Classifying text:</h1>
                        <br />
                        <div id="classifier-view">
                            {this.props.textItem.text}
                            <ButtonToolbar id="classifier-options">
                                {this.getButtons()}
                            </ButtonToolbar>
                        </div>
                    </div>
                );
        }
    }
}

Client.defaultProps = {
    textItem: null
}

export default Client