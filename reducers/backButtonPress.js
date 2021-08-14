const backButtonPressReducer = (state = false, action) => {
    switch(action.type){
        case 'BackPressed':
            return true;
            case 'BackCleared':
                return false;
        default:
            return state;
    }
};

export default backButtonPressReducer;