import React from 'react'
import {Button, ButtonToolbar} from "react-bootstrap";
import {connect} from "react-redux";
import Actions from '../actions/Actions'
import Constants from '../constants/Constants'
import TextItem from '../models/TextItem'

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

    formatResult(){
        let { testResult } = this.props;
        if(!testResult){
            return null;
        }
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

    render(){
        return (
            <div className="container-fluid" id="app-container">
                <h1>Test Page</h1>
                {this.formatResult()}
                <br />
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <br />
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
