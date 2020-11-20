import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import VagasFeed from './VagasFeed'
import VisualizarVaga from './VisualizarVaga'

const Stack = createStackNavigator()

export default function TrabalhadorFeed({}) {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 50,
		marginTop: 60,
		marginBottom: 30,
		color: '#009688'
	}
})
