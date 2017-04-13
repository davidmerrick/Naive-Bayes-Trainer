import React from 'react'
import {Button} from "react-bootstrap";
import { connect } from 'react-redux'
import Actions from '../actions/Actions'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

@connect(store => {
    return {
        past: store.TextItemReducer.past,
        canUndo: store.TextItemReducer.past.length > 1
    };
})
class UndoRedo extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(){
        let past = this.props.past;
        let length = this.props.past.length;
        let previousTextItem = past[length - 1].textItem;
        this.props.dispatch(Actions.undo(previousTextItem));
    }

    render() {
        if(!this.props.canUndo){
            return null;
        }
        return(
            <div>
                <Button
                    bsStyle="primary"
                    onClick={() => this.handleClick()}
                >
                    Undo
                </Button>
            </div>
        );
    }
}

export default UndoRedo