import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation, useRoute } from '@react-navigation/native'

const FooterMenu = () => {

    const navigation = useNavigation();
    const route = useRoute()

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <FontAwesome5 name="home" style={styles.iconStyle} color={route.name === 'Home' && 'grey'} />
                <Text>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Post')}>
                <FontAwesome5 name="plus-circle" style={styles.iconStyle} color={route.name === 'Post' && 'green'} />
                <Text>Post</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('MyPost')}>
                <FontAwesome5 name="list" style={styles.iconStyle} color={route.name === 'MyPost' && 'blue'} />
                <Text>My Posts</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <FontAwesome5 name="user" style={styles.iconStyle} color={route.name === 'Account' && 'red'} />
                <Text>Account</Text>
            </TouchableOpacity>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 20
    },
    iconStyle: {
        fontSize: 25,
        marginBottom: 5,
        alignSelf: 'center',
    }
})


export default FooterMenu