import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import FooterMenu from '../Component/Menus/FooterMenu'
import HeaderMenu from '../Component/Menus/HeaderMenu'
import { PostContext } from '../Context/PostContext'
import PostCard from '../Component/PostCard'
import { useNavigation } from 'expo-router'

const Home = () => {

    //global state
    // const [state] = useContext(AuthContext)
    const [posts, _, getAllPosts] = useContext(PostContext)
    // const values = useContext(PostContext)
    // console.log(getAllPosts)

    const [refreshing, setRefreshing] = useState(false)

    const navigation = useNavigation()

    //refresh control
    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getAllPosts()
        // navigation.push('Home')
        setTimeout(() => {
            setRefreshing(false)
        }, 200)
    }, [])

    return (
        <View style={styles.container}  >
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <PostCard posts={posts} swipeDown={true} />
            </ScrollView>

            {/* <Text> */}
            {/* {JSON.stringify(posts, null, 4,)} */}
            {/* </Text> */}

            <View  >
                <FooterMenu />
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        margin: 10,
        // marginTop: 40,
        // backgroundColor: 'black'
    }
})

export default Home 