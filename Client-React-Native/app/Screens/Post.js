import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import FooterMenu from '../Component/Menus/FooterMenu'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import { PostContext } from '../Context/PostContext'



const Post = ({ navigation }) => {

    const [posts, setPosts] = useContext(PostContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePost = async () => {
        try {
            setLoading(true)
            if (!title || !description) {
                alert('Please add all the posts')
            }

            const { data } = await axios.post('/create-post',
                { title, description },
                // { headers: { Authorization: `Bearer ${token && token}` } }
            )
            setLoading(false)
            // alert(data && data.message)
            setPosts([...posts, data?.post])
            alert(data?.message)
            navigation.navigate('Home')


        } catch (error) {
            alert(error.response.data.message || error.message)
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <View style={styles.container}  >
            <ScrollView>

                <View style={{ alignItems: 'center' }} >
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }} >
                        CREATE A POST</Text>
                    <TextInput
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                        style={{ backgroundColor: 'white', width: 300, marginTop: 30, padding: 15, borderRadius: 40 }}
                        placeholder='add post title' />
                    <TextInput
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                        style={{ backgroundColor: 'white', width: 300, marginTop: 30, padding: 15, borderRadius: 20, textAlignVertical: 'top' }}
                        placeholder='add post description'
                        multiline={true}
                        numberOfLines={6} />
                </View>

                <View style={{ alignItems: 'center', marginTop: 60, }} >
                    <TouchableOpacity style={{ backgroundColor: 'green', padding: 15, width: 300, borderRadius: 40 }}
                        onPress={handlePost}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }} >
                            Create <FontAwesome5 name="plus-circle" size={18} /> Post</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
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

export default Post