import React from 'react'
import {Button} from "react-bootstrap";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

@connect(store => {
    return {
        canUndo: store.TextItemReducer.past.length > 2
    };
})
class UndoRedo extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(){
        let undoAction = UndoActionCreators.undo();
        this.props.dispatch(undoAction);
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