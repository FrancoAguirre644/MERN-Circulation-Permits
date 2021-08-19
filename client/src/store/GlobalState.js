import { createContext, useEffect, useReducer } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const initialState = {
        notify: {}, auth: {}, modal: [{ show: false }],
        users: [], profiles: [], sites: [], persons: [],
        vehicles: [], dailyPermits: []
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    useEffect(() => {

        const token = localStorage.getItem('jwt');

        if (token) {

            getData('auth/verify').then(res => {
                if (res.err) return localStorage.removeItem('jwt')

                dispatch({
                    type: "AUTH",
                    payload: {
                        token: token,
                        user: res.user
                    }
                })
            })

        }
        /*
                getData('profiles').then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        
                    dispatch({
                        type: "ADD_PROFILES",
                        payload: res.profiles
                    })
        
                })
        
                getData('users').then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        
                    dispatch({
                        type: "ADD_USERS",
                        payload: res.users
                    })
        
                }) */

        getData('sites').then(res => {

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({
                type: "ADD_SITES",
                payload: res.sites
            })

        })

        getData('persons').then(res => {

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({
                type: "ADD_PERSONS",
                payload: res.persons
            })

        })

        getData('vehicles').then(res => {

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({
                type: "ADD_VEHICLES",
                payload: res.vehicles
            })

        }) 

        getData('dailyPermits').then(res => {

            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({
                type: "ADD_DAILYPERMITS",
                payload: res.dailyPermits
            })

        })

    }, [])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )

}