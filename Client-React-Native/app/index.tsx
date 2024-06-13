import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RootNavigation from './RootNavigation'


const index = () => {

  // const Stack = createNativeStackNavigator()

  return (
  
    <NavigationContainer independent={true} >
 
 <RootNavigation/>

    </NavigationContainer>

  )
}

export default index

