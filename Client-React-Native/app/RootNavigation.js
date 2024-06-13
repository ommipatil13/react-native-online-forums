import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider } from './Context/AuthContext'
import { PostProvider } from './Context/PostContext'
import ScreenMenu from './Component/Menus/ScreenMenu'

const RootNavigation = () => {
    return (
        <AuthProvider>
            <PostProvider>
                <ScreenMenu />
            </PostProvider>
        </AuthProvider>
    )
}

export default RootNavigation