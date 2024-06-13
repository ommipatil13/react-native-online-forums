import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import InputBox from '../../Component/Forms/InputBox'
import SubmitButton from '../../Component/Forms/SubmitButton'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../Context/AuthContext'

const Login = ({ navigation }) => {

    //global state
    const [state, setState] = useContext(AuthContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            if (!email || !password) {
                Alert.alert('Please enter all details')
                setLoading(false)
                return
            }
            setLoading(false)

            const { data } = await axios.post("/login", { email, password })

            setState(data)
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            alert(data && data.message)
            navigation.navigate('Home')
            // console.log('Login', { email, password })
            // Alert.alert('Login success')

        } catch (error) {
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

    //temp function for check local storage
    const getLocalStorageData = async () => {
        let data = await AsyncStorage.getItem('@auth')
        // console.log('localStorage --------->', data)
    }
    getLocalStorageData()

    return (
        <View style={styles.container} >
            <Text style={styles.pageTitle} >Login</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox inputTitle={'Email:'} keyboardType='email-address' autoComplete='email' value={email} setValue={setEmail} />
                <InputBox inputTitle={'Password:'} secureTextEntry={true} autoComplete='password' value={password} setValue={setPassword} />
            </View>
            {/* <Text> {JSON.stringify({ name, email, password }, null, 4)} </Text> */}
            <SubmitButton btnTitle="Login" loading={loading} handleSubmit={handleSubmit} />
            <Text style={styles.linkText}>New User? {' '}
                <Text style={styles.linkTextSpan} onPress={() => navigation.navigate('Register')} >Click here to Register</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40
    },
    linkText: {
        textAlign: 'center',
        marginTop: 10,
    },
    linkTextSpan: {
        color: '#1877F2',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline',
    }

})


export default Login