import React, { useState, useReducer, useContext } from "react";
import reducer from "./reducers";
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, LOGIN_USER_BEGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from "./actions";
import axios from "axios";

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    jobLocation: userLocation || '',
}

const AppContext = React.createContext();
const AppProvider = ( {children }) => {
    const [state, dispathc] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispathc({type:DISPLAY_ALERT})
        clearAlert()
    }
    const clearAlert = () => {
        setTimeout(() => {
            dispathc({ type: CLEAR_ALERT})
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        localStorage.setItem('location', location)
    }

    const removeUserToLocalStorage = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('location')
    }


    const registerUser = async (currentUser) => {
        dispathc({ type: REGISTER_USER_BEGIN})
        console.log('dddd')
       
        try {
            console.log(currentUser)           
            const response = await axios.post('http://localhost:4000/api/auth/register',currentUser)
            // console.log(currentUser)
            // console.log('response')
            // console.log(response.data)
            const { user, token, location } = response.data
            dispathc({
                type: REGISTER_USER_SUCCESS,
                payload: { user, token, location},
            })
            addUserToLocalStorage({user,token,location})
            
        } catch (error) {
            console.log(error.response)
            dispathc({
                type: REGISTER_USER_ERROR,
                payload: {msg: error.response.data.msg},
            })
            
        }
        clearAlert()
    }

    const loginUser = async (currentUser) => {
        dispathc({ type: LOGIN_USER_BEGIN})
        // console.log('dddd')
       
        try {
            console.log(currentUser)           
            const {data} = await axios.post('http://localhost:4000/api/auth/login',currentUser)
            // console.log(currentUser)
            // console.log('response')
            // console.log(response.data)
            const { user, token, location } = data
            dispathc({
                type: LOGIN_USER_SUCCESS,
                payload: { user, token, location},
            })
            addUserToLocalStorage({user,token,location})
            
        } catch (error) {
            // console.log(error.response)
            dispathc({
                type: LOGIN_USER_ERROR,
                payload: {msg: error.response.data.msg},
            })
            
        }
        clearAlert()
    }


    return (
        <AppContext.Provider value={{ ...state,displayAlert, registerUser, loginUser}}>{children}</AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}
export {AppProvider, initialState, useAppContext}