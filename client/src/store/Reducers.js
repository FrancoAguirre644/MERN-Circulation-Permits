import { ACTIONS } from './Actions'

const reducers = (state, action) => {
    switch (action.type) {
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            }
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            }
        case ACTIONS.ADD_MODAL:
            return {
                ...state,
                modal: action.payload
            }
        case ACTIONS.ADD_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ACTIONS.ADD_PROFILES:
            return {
                ...state,
                profiles: action.payload
            }
        case ACTIONS.ADD_SITES:
            return {
                ...state,
                sites: action.payload
            }
        case ACTIONS.ADD_PERSONS:
            return {
                ...state,
                persons: action.payload
            }
        case ACTIONS.ADD_VEHICLES:
            return {
                ...state,
                vehicles: action.payload
            }
        case ACTIONS.ADD_DAILYPERMITS:
            return {
                ...state,
                dailyPermits: action.payload
            }
        case ACTIONS.ADD_PERIODPERMITS:
            return {
                ...state,
                periodPermits: action.payload
            }
        default:
            return state
    }
}

export default reducers