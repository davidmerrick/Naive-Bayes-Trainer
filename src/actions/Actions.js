import Endpoints from '../constants/Endpoints'
import ActionType from '../constants/ActionType'
import TextItem from '../models/TextItem'
import axios from 'axios'
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

    static updateData(textItem, option){
        textItem.classification = option;

        return dispatch => {
            async.series([
                callback => {
                    dispatch(this.storeIsLoading());
                    callback();
                },
                callback => {
                    axios.put(`${Endpoints.TEXTS}/${textItem.id}`, textItem)
                        .then(response => {
                            callback();
                        });
                },
                callback => {
                    this.getNextTextItem(dispatchData => {
                        dispatch(dispatchData);
                        callback;
                    });
                },
                callback => {
                        dispatch(this.storeIsReady());
                        callback;
                }
            ]);
        }
    }

    static storeIsLoading(){
        return {
            type: ActionType.STORE_IS_LOADING
        }
    }

    static storeIsReady(){
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
