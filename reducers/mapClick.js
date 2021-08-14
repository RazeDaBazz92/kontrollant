const mapClickedReducer = (state = false, action) => {
    switch(action.type){
        case 'MAP_CLICK':
            return true
        case 'MAP_UNCLICK':
            return false
        default:
            return state
    }
}
export default mapClickedReducer;