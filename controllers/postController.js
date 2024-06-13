const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please enter all post details"
            })
        }

        const post = await postModel({ title, description, postedBy: req.auth._id }).save()
        res.status(201).send({
            success: true,
            message: "post created ",
            post
        })

        // console.log(req)

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in create post api",
            error
        })
    }
}


const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('postedBy', '_id name').sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: 'get all post data',
            posts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in get post api",
            error
        })
    }
}



const getUserPosts = async (req, res) => {
    try {
        const userPosts = await postModel.find({ postedBy: req.auth._id })
        res.status(200).send({
            success: true,
            message: 'get user post data',
            userPosts
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in get user post api",
            error
        })
    }
}


const deletePosts = async (req, res) => {
    try {
        const { id } = req.params

        await postModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: 'user data delete',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in delete post api",
            error
        })
    }
}


const updatePosts = async (req, res) => {
    try {
        // const { id } = req.params
        const { title, description } = req.body

        const post = await postModel.findById({ _id: req.params.id })


        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: "please fill all details"
            })
        }

        const updateUserPost = await postModel.findByIdAndUpdate({ _id: req.params.id },
            {
                title: title || post?.title,
                description: description || post && post.description
            },
            { new: true })
        res.status(200).send({
            success: true,
            message: 'user data update',
            updateUserPost
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "error in update post api",
            error
        })
    }
}

module.exports = { createPostController, getAllPosts, getUserPosts, deletePosts, updatePosts }