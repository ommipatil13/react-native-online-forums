import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import FooterMenu from '../Component/Menus/FooterMenu'
import axios from 'axios'
import PostCard from '../Component/PostCard'


const MyPost = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const getUserPost = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('/get-user-post')
            setLoading(false)
            setPosts(data?.userPosts)

        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getUserPost()
    }, [])

    return (
        <View style={styles.container}  >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <PostCard posts={posts} myPostScreen={true} />
                {/* <Text> {JSON.stringify(posts, null, 4)} </Text> */}
            </ScrollView>
            <View  >
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
        marginTop: 20,
    }
})


export default MyPost