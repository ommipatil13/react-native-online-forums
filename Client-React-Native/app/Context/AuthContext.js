import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

//context
const AuthContext = createContext();

//provider
const AuthProvider = ({ children }) => {
    //global state
    const [state, setState] = useState({
        user: null,
        token: ''
    })



    //initial local storage data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth')
            let loginData = JSON.parse(data) //we convert json into object
            setState({ ...state, user: loginData?.user, token: loginData?.token })
        }
        loadLocalStorageData()
    }, [])

    let token = state && state.token

    //axios default setting
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.baseURL = 'https://react-native-online-forums.onrender.com/api/'

    return (
        <AuthContext.Provider value={[state, setState]} >
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }