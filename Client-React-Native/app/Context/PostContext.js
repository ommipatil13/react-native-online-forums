import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const PostContext = createContext();

const PostProvider = ({ children }) => {

    const [loading, setLoading] = useState(false)

    const [posts, setPosts] = useState([])

    const getAllPosts = async () => {
        // console.log('getAllPosts')
        setLoading(true)
        try {
            const { data } = await axios.get('/get-all-post')
            setLoading(false)
            setPosts(data?.posts)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllPosts()
    }, [])


    return (

        <PostContext.Provider value={[posts, setPosts, getAllPosts]} >
            {children}
        </PostContext.Provider>
    )
}


export { PostContext, PostProvider }





















































