import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FooterMenu from '../Component/Menus/FooterMenu'


const About = () => {


    return (
        <View style={styles.container}  >
            <View style={{ flex: 1, justifyContent: 'flex-end' }} >
                <FooterMenu />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        marginTop: 40,
    }
})

export default About