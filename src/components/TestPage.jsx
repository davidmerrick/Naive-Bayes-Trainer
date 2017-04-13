import React from 'react'
import {Button} from "react-bootstrap";
import {connect} from "react-redux";
import Actions from '../actions/Actions'

@connect(store => {
    return {
        testResult: store.TestReducer.testResult
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

    handleSubmit(event) {
        this.props.dispatch(Actions.test(this.state.value));
        event.preventDefault();
    }

    formatResult(){
        let { testResult } = this.props;
        if(!testResult){
            return null;
        }
        return(
            <div>
                Test Result for "{testResult.text}": <br />
                {testResult.result}
            </div>
        );
    }

    render(){
        return (
            <div className="container-fluid" id="app-container">
                <h1>Test Page</h1>
                {this.formatResult()}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <br />
                    <Button type="submit" bsStyle="primary">
                        Test
                    </Button>
                </form>
            </div>
        );
    }
}

TestPage.defaultProps = {
    testResult: null
}


export default TestPage
