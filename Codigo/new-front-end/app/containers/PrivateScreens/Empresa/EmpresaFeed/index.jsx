import React from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import VagasFeed from './VagasFeed'
import VisualizarVaga from './VisualizarVaga'
import { StateContext } from '../../../../contexts'
import VisualizarTrabalhador from './VisualizarVaga/VisualizarTrabalhador'
import EditarVaga from './EditarVaga'

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
			<Stack.Screen
				name="Visualizar Trabalhador"
				component={VisualizarTrabalhador}
			></Stack.Screen>
			<Stack.Screen name="Editar Vaga" component={EditarVaga}></Stack.Screen>
		</Stack.Navigator>
	)
}
