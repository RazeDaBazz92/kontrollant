import filterReducer from './filter';
import backButtonPressReducer from './backButtonPress';
import previousPageReducer from './previousPageTracker';
import mapClickReducer from './mapClick'
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    filter: filterReducer,
    backButton: backButtonPressReducer,
    previousPage: previousPageReducer,
    mapClicked: mapClickReducer
})

export default allReducers;