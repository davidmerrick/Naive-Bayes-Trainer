import React from "react";
import {Button, FormControl} from "react-bootstrap";
import {connect} from "react-redux";
import Actions from "../actions/Actions";
import TestStoreState from "../constants/TestStoreState";
import Mousetrap from "mousetrap";
import TestClassifier from "./TestClassifier.jsx";

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

    componentWillMount(){
        Mousetrap.bind(['command+enter', 'ctrl+enter'], e => {
            this.handleSubmit(null);
        });
    }

    handleSubmit(event) {
        this.props.dispatch(Actions.test(this.state.value));
        event.preventDefault();
    }

    render(){
        let { storeState } = this.props;
        switch(storeState) {
            case TestStoreState.GOT_RESULT:
                return(
                    <div>
                        <h1>Test Page</h1>
                        <TestClassifier
                            text={this.state.value}
                        />
                    </div>
                );
                break;
            case TestStoreState.POSTED_ITEM:
                // Todo: add progress bar here to indicate there's a timeout
                setTimeout(() => {
                    this.props.dispatch(Actions.testStoreIsReady());
                }, 2000);

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
                                className="mousetrap"
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
                            <span style={{fontStyle: 'italic'}}>&nbsp;&nbsp;ctrl + enter or ⌘ + enter</span>
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
