import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import VagasFeed from './VagasFeed'
import VisualizarVaga from './VisualizarVaga'
import { StateContext } from '../../../../contexts'

const Stack = createStackNavigator()

export default function EmpresaFeed({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="Feed">
			<Stack.Screen
				name="Feed"
				component={VagasFeed}
				options={{ headerShown: false }}
			></Stack.Screen>
			<Stack.Screen
				name="Visualizar Vaga"
				component={VisualizarVaga}
			></Stack.Screen>
		</Stack.Navigator>
	)
}
