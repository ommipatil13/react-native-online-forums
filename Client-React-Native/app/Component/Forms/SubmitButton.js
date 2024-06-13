import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const SubmitButton = ({ handleSubmit, btnTitle, loading }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={handleSubmit} >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '400', fontSize: 18 }} >
                {loading ? <ActivityIndicator color='white' /> : btnTitle}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#1877F2',
        padding: 15,
        borderRadius: 50,
        marginHorizontal: 20,
        marginTop: 20

    }
})

export default SubmitButton 