import Endpoints from '../constants/Endpoints'
import ActionType from '../constants/ActionType'
import TextItem from '../models/TextItem'
import axios from 'axios'
import Classification from '../models/Classification'
import async from 'async'

class Actions {

    static initialize(){
        return dispatch => {
            this.getNextTextItem(dispatchData => {
                dispatch(dispatchData);
            });
        };
    }

    static getNextTextItem(callback){
        axios.get(`${Endpoints.TEXTS}/next`).then(response => {
            let data = response.data;
            let textItem = new TextItem(data.id, data.text)
            let dispatchData = {
                type: ActionType.GET_NEXT_TEXT_FULFILLED,
                payload: {
                    textItem: textItem
                }
            };
            return callback(dispatchData);
        });
    }

    static submitData(textItem, option){
        let newClassification = new Classification(textItem, option);

        return dispatch => {
            async.series([
                callback => {
                    dispatch(this.storeIsLoading());
                    callback();
                },
                callback => {
                    axios.post(`${Endpoints.CLASSIFICATIONS}`, newClassification)
                        .then(response => {
                            callback();
                        });
                },
                callback => {
                    this.getNextTextItem(dispatchData => {
                        dispatch(dispatchData);
                        callback;
                    });
                }
            ]);
        }
    }

    static storeIsLoading(){
        return {
            type: ActionType.STORE_IS_LOADING
        }
    }

    static updateCount(count, remaining){
        return {
            type: ActionType.UPDATED_COUNT,
            payload: {
                count: count,
                remaining: remaining
            }
        }
    }
}

export default Actions
