import React, { useContext, useState } from 'react'
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import VagasFeed from './VagasFeed'
import VisualizarVaga from './VisualizarVaga'
import { StateContext } from '../../../../contexts'

const Stack = createStackNavigator()

export default function EmpresaFeed({ navigation }) {
	const { userEmail, authToken } = useContext(StateContext)
	const [empresa, setEmpresa] = useState({
		cnpj: '',
		email: '',
		razaoSocial: '',
		site: '',
		telefoneDeContato: '',
		caminhoParaImagem: '',
		eValido: true
	})

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
