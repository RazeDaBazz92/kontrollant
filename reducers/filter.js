const filterReducer = (state = 60, action) => {
    switch(action.type){
        case 'FILTER_15_MINUTES':
            return 15
        case 'FILTER_1_HOUR':
            return 60
        case 'FILTER_4_HOURS':
            return 240            
        case 'FILTER_12_HOURS':
            return 720
        case 'FILTER_24_HOURS':
            return 1440
        case 'FILTER_7_DAYS':
            return 10080
        case 'FILTER_30_DAYS':
            return 43200
        default:
            return state
    }
}
export default filterReducer;