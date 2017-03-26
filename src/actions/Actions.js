import Endpoints from '../constants/Endpoints'
import ActionType from '../constants/ActionType'
import TextItem from '../models/TextItem'
import axios from 'axios'

class Actions {

    static initialize(){
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
        }
    }
}

export default Actions
