import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'


const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext)

    //logout
    const handleLogout = async () => {
        setState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        alert('logout success')
    }

    return (
        <View>
            <TouchableOpacity onPress={handleLogout} >
                <FontAwesome5 name="sign-out-alt" style={styles.iconStyle} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    iconStyle: {
        fontSize: 25,
        color: 'red',
    }
})

export default HeaderMenu