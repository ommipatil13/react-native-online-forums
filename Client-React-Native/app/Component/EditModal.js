import axios from 'axios';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ActivityIndicator } from 'react-native';

const EditModal = ({ setModalVisible, modalVisible, post }) => {
    // const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()


    const handleUpdatePost = async (id) => {
        try {
            setLoading(true)
            const { data } = await axios.put(`/update-post/${id}`, { title, description })
            setLoading(false)
            alert(data?.message)
            navigation.push('MyPost')

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        setTitle(post?.title)
        setDescription(post?.description)
    }, [post])

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        {/* <Text> {JSON.stringify(post, null, 4)} </Text> */}

                        <Text style={styles.modalText}>Update your Posts</Text>

                        <View  >
                            <Text>Title:</Text>
                            <TextInput style={{ backgroundColor: '#DCDCDC', borderRadius: 40, paddingLeft: 10, padding: 3, }}
                                value={title} onChangeText={(text) => setTitle(text)} />
                        </View>
                        <View style={{ marginVertical: 15, marginBottom: 35 }}>
                            <Text>Description:</Text>
                            <TextInput style={{ backgroundColor: '#DCDCDC', borderRadius: 20, paddingLeft: 10, paddingTop: 10, textAlignVertical: 'top' }}
                                multiline={true} numberOfLines={6}
                                value={description} onChangeText={(text) => setDescription(text)} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >

                            <Pressable
                                style={[styles.button, styles.buttonUpdate]}
                                onPress={() => handleUpdatePost(post && post._id)}>
                                <Text style={styles.textStyle}>{loading ? <ActivityIndicator /> : "Update"}</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>

                        </View>

                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    buttonUpdate: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: 'center',
    },
});

export default EditModal;