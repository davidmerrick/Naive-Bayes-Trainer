import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import Constants from "../constants/Constants";
import {connect} from "react-redux";
import StoreState from "../constants/StoreState";
import Actions from "../actions/Actions";
import io from "socket.io-client";
import SocketEvents from "../constants/SocketEvents";
import Endpoints from "../constants/Endpoints";
import UndoRedo from './UndoRedo.jsx'
import Mousetrap from 'mousetrap'

@connect(store => {
    return {
        storeState: store.Reducer.storeState,
        error: store.Reducer.error,
        textItem: store.TextItemReducer.present.textItem,
        count: store.Reducer.count,
        remaining: store.Reducer.remaining
    };
})
class Classifier extends React.Component {

    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(Actions.initialize());

        if(Constants.OPTIONS.length === 2) {
            Mousetrap.bind(['1'], e => {
                this.handleButtonClick(Constants.OPTIONS[0].value);
            });
            Mousetrap.bind(['2'], e => {
                this.handleButtonClick(Constants.OPTIONS[1].value);
            });
        }
    }

    componentDidMount() {
        let socket = io.connect(`http://localhost:${Constants.PORT}`);
        socket.on('connection', console.log("Connected to websocket server"))
        socket.on(SocketEvents.UPDATE_COUNT, data => {
            this.props.dispatch(Actions.updateCount(data.count, data.remaining));
        });
    }

    handleButtonClick(option){
        let { textItem } = this.props;
        this.props.dispatch(Actions.updateData(textItem, option));
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

    getCountText(){
        let { count, remaining } = this.props;
        let items = "items";

        if(!remaining){
            return `Classified ${count} ${items}.`
        } else {
            let total = remaining + count;
            return `Classified ${count}/${total} ${items}.`
        }
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
                let {text} = this.props.textItem;
                if(!text){
                    return(
                        <div>
                            <h1>Done classifying.</h1>
                            <a href={`${Endpoints.CLASSIFICATIONS}`} download="classifier.json">Export classification</a>
                        </div>
                    );
                }
                return (
                    <div>
                        <h1>Classifying text:</h1>
                        <br />
                        <div id="classifier-view">
                            <div id="classifier-text">
                                {text}
                            </div>
                            <ButtonToolbar id="classifier-options">
                                {this.getButtons()}
                            </ButtonToolbar>
                        </div>
                        <br />
                        <UndoRedo />
                        <div id="count-view">
                            {this.getCountText()}
                        </div>
                        <a href={`${Endpoints.CLASSIFICATIONS}`} download="classifier.json">Export classification</a>
                    </div>
                );
                break;
            default:
                return(
                    <div>
                        <h1>Error: Application state is invalid.</h1>
                    </div>
                );
                break;
        }
    }
}

Classifier.defaultProps = {
    textItem: null
}

export default Classifier