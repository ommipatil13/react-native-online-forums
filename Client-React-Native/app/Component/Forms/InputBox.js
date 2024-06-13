import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

const inputBox = ({ inputTitle, autoComplete, keyboardType, secureTextEntry = false, value, setValue }) => {
    return (
        <View>
            <Text>{inputTitle}</Text>
            <TextInput
                style={styles.inputBox}
                autoCorrect={false}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={(text) => setValue(text)}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    inputBox: {
        height: 40,
        marginBottom: 20,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginTop: 5,
        paddingLeft: 10,
        height: 50,
    },


})


export default inputBox