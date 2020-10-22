import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

const Stack = createStackNavigator()

export default function PublicContainer() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
			<Stack.Screen name="Registro" component={RegisterScreen}></Stack.Screen>
		</Stack.Navigator>
	)
}
