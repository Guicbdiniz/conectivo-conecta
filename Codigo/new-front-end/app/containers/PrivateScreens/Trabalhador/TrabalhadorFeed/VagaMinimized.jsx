import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppButton from '../../../../components/AppButton'

export default function VagaMinimized({
	vaga,
	navigation,
	subscribed,
	setSubscribedVagasIds
}) {
	return (
		<View style={styles.vaga}>
			<View style={styles.idView}>
				<Text style={styles.idText}>ID: {vaga.id}</Text>
				{subscribed ? (
					<Text style={styles.subscriptionText}>Inscrito</Text>
				) : (
						<></>
					)}
			</View>
			<View style={styles.infoView}>
				<Text style={styles.infoText}>
					<Text style={{ fontWeight: 'bold' }}>Título: </Text>
					{vaga.titulo}
				</Text>
				<Text style={styles.infoText}>
					<Text style={{ fontWeight: 'bold' }}>Categoria: </Text>
					{vaga.categoria}
				</Text>
			</View>

			<View style={styles.buttonsView}>
				<AppButton
					title="Visualizar"
					onPress={() => {
						navigation.navigate('Visualizar Vaga', {
							vaga: vaga,
							setSubscribedVagasIds: setSubscribedVagasIds,
							subscribed: subscribed
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
		paddingBottom: 5,
		flexDirection: 'row',
		justifyContent: 'space-between'
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
	},
	subscriptionText: {
		textAlign: 'right',
		color: 'red',
		fontSize: 20,
		marginRight: 20,
		fontWeight: 'bold'
	}
})
