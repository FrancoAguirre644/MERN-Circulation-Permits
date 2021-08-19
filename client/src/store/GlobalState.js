import { createContext, useEffect, useReducer } from 'react'
import reducers from './Reducers'
import { getData } from '../utils/fetchData'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const initialState = {
        notify: {}, auth: {}, modal: [{ show: false }],
        users: [], profiles: [], sites: [], persons: [],
        vehicles: []
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

    }, [])

    /*
    useEffect(() => {
        const __next__cart01 = JSON.parse(localStorage.getItem('__next__cart01'))

        if (__next__cart01) dispatch({ type: 'ADD_CART', payload: __next__cart01 })
    }, [])

    useEffect(() => {
        localStorage.setItem('__next__cart01', JSON.stringify(cart))
    }, [cart])

    useEffect(() => {
        if (auth.token) {

            getData('order', auth.token)
                .then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                    dispatch({ type: 'ADD_ORDERS', payload: res.orders })
                })

            if (auth.user.role === 'admin') {
                getData('user', auth.token)
                    .then(res => {
                        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                        dispatch({ type: 'ADD_USERS', payload: res.users })
                    })
            }

        } else {
            dispatch({ type: 'ADD_ORDERS', payload: [] })
            dispatch({ type: 'ADD_USERS', payload: [] })
        }
    }, [auth.token]) */

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )

}