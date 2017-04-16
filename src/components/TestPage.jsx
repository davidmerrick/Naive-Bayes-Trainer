import React from 'react'
import {Button, ButtonToolbar, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import Actions from '../actions/Actions'
import Constants from '../constants/Constants'
import TextItem from '../models/TextItem'
import TestStoreState from '../constants/TestStoreState'

@connect(store => {
    return {
        testResult: store.TestReducer.testResult,
        storeState: store.TestReducer.storeState
    };
})

class TestPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        });
    }

    handleButtonClick(option){
        let textItem = new TextItem(null, this.state.value);
        this.props.dispatch(Actions.postData(textItem, option));
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


    handleSubmit(event) {
        this.props.dispatch(Actions.test(this.state.value));
        event.preventDefault();
    }

    render(){
        let { storeState } = this.props;
        switch(storeState) {
            case TestStoreState.GOT_RESULT:
                let { testResult } = this.props;
                return(
                    <div>
                        <h1>Test Page</h1>
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
                    </div>
                );
                break;
            case TestStoreState.POSTED_ITEM:
                setTimeout(() => {
                    this.props.dispatch(Actions.testStoreIsReady());
                }, 3000);

                return(
                    <div>
                        <h1>Test Page</h1>
                        <p>Posted new item.</p>
                    </div>
                );
                break;
            case TestStoreState.READY:
            default:
                return (
                    <div>
                        <h1>Test Page</h1>
                        <br />
                        <form onSubmit={this.handleSubmit}>
                            <FormControl
                                id="test-input"
                                componentClass="textarea"
                                value={this.state.value}
                                onChange={this.handleChange}
                                bsSize="large"
                                style={{height: '200px'}}
                            />
                            <br />
                            <br />
                            <Button type="submit" bsStyle="primary">
                                Test
                            </Button>
                        </form>
                    </div>
                );
                break;
        };
    }
}

TestPage.defaultProps = {
    testResult: null
}


export default TestPage
