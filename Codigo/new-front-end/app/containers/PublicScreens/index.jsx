import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterTrabalhadorForm from './RegisterScreen/RegisterTrabalhadorForm'
import RegisterEmpresaForm from './RegisterScreen/RegisterEmpresaForm'
import SelectAccoutTypeForm from './RegisterScreen/SelectAccoutTypeForm'

const Stack = createStackNavigator()

export default function PublicContainer() {
	return (
		<Stack.Navigator initialRouteName="Login">
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{ headerShown: false }}
			></Stack.Screen>
			<Stack.Screen name="Registro" component={SelectAccoutTypeForm} />
			<Stack.Screen
				name="Registro de Trabalhador"
				component={RegisterTrabalhadorForm}
			/>
			<Stack.Screen
				name="Registro de Empresa"
				component={RegisterEmpresaForm}
			/>
		</Stack.Navigator>
	)
}
