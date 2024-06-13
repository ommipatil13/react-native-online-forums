import React, { useContext } from 'react'
import Register from '../../Screens/Auth/Register'
import Login from '../../Screens/Auth/Login'
import Home from '../../Screens/Home'
import Post from '../../Screens/Post'
import About from '../../Screens/About'
import MyPost from '../../Screens/MyPost'
import Account from '../../Screens/Account'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthContext, AuthProvider } from '../../Context/AuthContext'
import HeaderMenu from './HeaderMenu'

const ScreenMenu = () => {

    //global state
    const [state] = useContext(AuthContext)

    //auth condition true false 
    const authenticatedUser = state?.user && state?.token  //?. means && for eg state && state.token 

    const Stack = createNativeStackNavigator()

    return (

        // <NavigationContainer independent={true} >
        // <AuthProvider>   

        <Stack.Navigator initialRouteName='Login'>

            {/* <Stack.Navigator initialRouteName='Home'> */}

            {/* <Stack.Navigator initialRouteName='Register'> */}

            {authenticatedUser ?
                (
                    <>
                        <Stack.Screen name='Home' component={Home} options={{ title: 'My Native Project', headerRight: () => <HeaderMenu /> }} />
                        <Stack.Screen name='Post' component={Post} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu /> }} />
                        <Stack.Screen name='About' component={About} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu /> }} />
                        <Stack.Screen name='MyPost' component={MyPost} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu /> }} />
                        <Stack.Screen name='Account' component={Account} options={{ headerBackTitle: 'Back', headerRight: () => <HeaderMenu /> }} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                    </>
                )
            }

            {/* <Stack.Screen name='Home' component={Home} options={{ title: 'My Native Project', headerRight: () => <HeaderMenu /> }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} /> */}


        </Stack.Navigator >

        // </AuthProvider>
        // </NavigationContainer>

    )
}

export default ScreenMenu