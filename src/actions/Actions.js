import Endpoints from '../constants/Endpoints'
import ActionType from '../constants/ActionType'
import TextItem from '../models/TextItem'
import axios from 'axios'
import Classification from '../models/Classification'
import async from 'async'

class Actions {

    static initialize(){
        return this.getNextTextItem();
    }

    static getNextTextItem(){
        return dispatch => {
            axios.get(`${Endpoints.TEXTS}/next`).then(response => {
                let data = response.data;
                let textItem = new TextItem(data.id, data.text)
                dispatch({
                    type: ActionType.GET_NEXT_TEXT_FULFILLED,
                    payload: {
                        textItem: textItem
                    }
                });
            });
        };
    }

    static submitData(textItem, option){
        let newClassification = new Classification(textItem.text, option);

        return dispatch => {
            async.series([
                callback => {
                    dispatch(this.storeIsLoading());
                    callback();
                },
                callback => {
                    axios.post(`${Endpoints.CLASSIFICATIONS}`, JSON.stringify(newClassification))
                        .then(response => {
                            callback();
                        });
                },
                callback => {
                    this.getNextTextItem();
                }
            ]);
        }
    }

    static storeIsLoading(){
        return {
            type: ActionType.STORE_IS_LOADING
        }
    }
}

export default Actions
