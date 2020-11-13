import React from 'react'
import { Text, View } from 'react-native'

export default function VisualizarVaga({ navigation, route }) {
	const { vaga } = route.params

	return (
		<View>
			<Text>Teste: {vaga.id}</Text>
		</View>
	)
}
