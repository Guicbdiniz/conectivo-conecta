import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppButton from '../../../../../components/AppButton'

export default function TrabalhadorRelatedToVaga({ trabalhador, navigation }) {
	return (
		<View style={styles.trabalhador}>
			<Text style={styles.infoText}>
				<Text style={{ fontWeight: 'bold' }}>Nome: </Text>
				{trabalhador.nomeCompleto}
			</Text>
			<Text style={styles.infoText}>
				<Text style={{ fontWeight: 'bold' }}>CPF: </Text>
				{trabalhador.cpf}
			</Text>
			<AppButton
				title="Visualizar"
				style={styles.button}
				fontSize={13}
				onPress={() => {
					navigation.navigate('Visualizar Trabalhador', {
						trabalhador: trabalhador
					})
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	trabalhador: {
		borderRadius: 20,
		backgroundColor: '#EAEAEA',
		width: '100%',
		marginBottom: 20,
		padding: 5,
		alignItems: 'center'
	},
	infoText: { fontSize: 17, marginBottom: 5 },
	button: {
		maxWidth: 100,
		margin: 10
	}
})
