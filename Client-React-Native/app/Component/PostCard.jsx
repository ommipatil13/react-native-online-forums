import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { useNavigation } from 'expo-router'
// import { useNavigation } from '@react-navigation/native'
import EditModal from './EditModal'


const PostCard = ({ posts, myPostScreen, swipeDown }) => {

    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const [post, setPost] = useState({})

    const handleDeletePrompt = (id) => {

        Alert.alert('Attention!', 'Are you sure want to delete post?', [{
            text: 'Cancel',
            onPress: () => console.log('Cancel press')
        },
        {
            text: 'Delete',
            // onPress: () => console.log("Delete press")
            onPress: () => handleDelete(id)
        }
        ])
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.delete(`/delete-post/${id}`)
            setLoading(false)
            alert(data?.message)
            navigation.push('MyPost')


        } catch (error) {
            setLoading(false)
            console.log(error)
            alert(error)
        }
    }

    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View>
            {/* <Text style={{ textAlign: 'center' }} > Total Posts {posts?.length} </Text> */}
            {swipeDown && (<Text style={{ textAlign: 'center', marginBottom: 20 }}  > swipe down to refresh </Text>)}

            {myPostScreen && (
                <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={post} />)
            }

            {posts?.map((post, index) => (
                <View style={styles.card} key={index} >

                    {myPostScreen && (
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 25 }} >
                            <TouchableOpacity onPress={() => { setPost(post), setModalVisible(true) }} >
                                <Text >
                                    <FontAwesome5 name="pen" style={{ color: 'darkblue' }} size={16} />
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeletePrompt(post?._id)} >
                                <Text >
                                    <FontAwesome5 name="trash" style={{ color: 'red' }} size={16} />
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text
                        style={{ fontWeight: "bold", textAlign: 'center', marginBottom: 20, borderBottomWidth: 1, }} >
                        Title: {post && post.title} </Text>
                    <Text> Description: {post?.description} </Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} >

                        {post?.postedBy?.name && (
                            <Text >
                                <FontAwesome5 name="user" style={{ color: 'red' }} /> {post?.postedBy?.name} </Text>
                        )}

                        <Text>  <FontAwesome5 name="clock" /> {moment(post?.createdAt).format('DD:MM:YYYY')}   </Text>

                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        // width: "100%",
        borderWidth: 0.5,
        borderColor: 'grey',
        padding: 20,
        borderRadius: 20,
        marginVertical: 10,
    }
})

export default PostCard