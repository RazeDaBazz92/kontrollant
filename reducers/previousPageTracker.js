const previousPageReducer = (state = "", action) => {
    switch(action.type){
        case 'MAP':
            return "Map";
            case 'ABOUT':
                return "About";
                case 'RIGHTS':
                    return "Rights";
                    case 'DONATION':
                        return "Donation";
                        case 'CONTACT':
                            return "Contact";
        default:
            return state;
    }
};

export default previousPageReducer;