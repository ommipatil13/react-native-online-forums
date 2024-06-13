import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import InputBox from '../../Component/Forms/InputBox'
import SubmitButton from '../../Component/Forms/SubmitButton'
import axios from 'axios'

const Register = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        // e.preventDefault()
        try {
            setLoading(true)
            if (!name || !email || !password) {
                Alert.alert('Please enter all details')
                setLoading(false)
                return
            }
            setLoading(false)

            const { data } = await axios.post("/register", { name, email, password })

            alert(data && data.message)
            navigation.navigate('Login')
            // console.log('Register', { name, email, password })
            // Alert.alert('Register success')
        }

        catch (error) {
            alert(error.response.data.message)
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <View style={styles.container} >
            <Text style={styles.pageTitle} >Register</Text>
            <View style={{ marginHorizontal: 20 }}>
                <InputBox inputTitle={'Name:'} value={name} setValue={setName} />
                <InputBox inputTitle={'Email:'} keyboardType='email-address' autoComplete='email' value={email} setValue={setEmail} />
                <InputBox inputTitle={'Password:'} secureTextEntry={true} autoComplete='password' value={password} setValue={setPassword} />
            </View>
            {/* <Text> {JSON.stringify({ name, email, password }, null, 4)} </Text> */}
            <SubmitButton btnTitle="Register" loading={loading} handleSubmit={handleSubmit} />
            <Text style={styles.linkText}>Already Register? {' '}
                <Text style={styles.linkTextSpan} onPress={() => navigation.navigate('Login')} >Click here to Login</Text>
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


export default Register