import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppButton from '../../../../components/AppButton'

export default function VagaMinimized({ vaga, navigation }) {
	return (
		<View style={styles.vaga}>
			<View style={styles.idView}>
				<Text style={styles.idText}>ID: {vaga.id}</Text>
			</View>
			<View style={styles.infoView}>
				<Text style={styles.infoText}>
					<Text style={{ fontWeight: 'bold' }}>Título: </Text>
					{vaga.titulo}
				</Text>
				<Text style={styles.infoText}>
					<Text style={{ fontWeight: 'bold' }}>Catergoria: </Text>
					{vaga.categoria}
				</Text>
			</View>
			<View style={styles.buttonsView}>
				<AppButton
					title="Visualizar"
					onPress={() => {
						navigation.navigate('Visualizar Vaga', {
							vaga: vaga
						})
					}}
					style={styles.buttonStyle}
					fontSize={15}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	vaga: {
		borderRadius: 20,
		backgroundColor: '#EAEAEA',
		width: '80%',
		marginBottom: 20
	},
	idView: {
		width: '100%',
		borderTopLeftRadius: 20,
		borderTopEndRadius: 20,
		backgroundColor: '#009688',
		paddingLeft: 20,
		paddingTop: 5,
		paddingBottom: 5
	},
	idText: {
		fontSize: 20
	},
	infoView: {
		padding: 15
	},
	infoText: {
		fontSize: 17,
		marginBottom: 5
	},
	buttonStyle: {
		width: '40%',
		paddingVertical: 8
	},
	buttonsView: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 20
	}
})
