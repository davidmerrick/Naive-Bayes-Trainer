import React from "react";
import {Button, ButtonToolbar} from "react-bootstrap";
import Actions from "../actions/Actions";
import Constants from "../constants/Constants";
import TextItem from "../models/TextItem";
import Mousetrap from 'mousetrap'
import {connect} from "react-redux";

@connect(store => {
    return {
        testResult: store.TestReducer.testResult
    };
})

class TestClassifier extends React.Component {

    constructor(props){
        super(props);
    }

    handleButtonClick(option){
        let textItem = new TextItem(null, this.props.text);
        this.props.dispatch(Actions.postData(textItem, option));
    }

    componentWillMount() {
        if(Constants.OPTIONS.length === 2) {
            Mousetrap.bind(['1'], e => {
                this.handleButtonClick(Constants.OPTIONS[0].value);
            });
            Mousetrap.bind(['2'], e => {
                this.handleButtonClick(Constants.OPTIONS[1].value);
            });
        }
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
        let { testResult } = this.props;
        return(
            <div>
                Test Result for "{testResult.text}": <br />
                {testResult.result}
                <br />
                <h2>Actual classification?</h2>
                <br />
                <ButtonToolbar>
                    {this.getButtons()}
                </ButtonToolbar>
            </div>
        );
    }
}

TestClassifier.defaultProps = {
    testResult: null,
    text: null
}

export default TestClassifier
