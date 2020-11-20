import React, { useContext } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { subscribeTrabalhadorToVaga } from '../../../../API/VagaAPI'
import AppButton from '../../../../components/AppButton'
import { DispatchContext, StateContext } from '../../../../contexts'

export default function VisualizarVaga({ route, navigation }) {
	const { vaga, setSubscribedVagasIds, subscribed } = route.params
	const { authToken, userData: trabalhador } = useContext(StateContext)
	const dispatch = useContext(DispatchContext)

	function handleSubscribeButton() {
		Alert.alert(
			'Atenção',
			`Você deseja se inscrever a vaga de ${vaga.titulo}?`,
			[{ text: 'Ok', onPress: subscribe }, { text: 'Cancelar' }]
		)
	}

	function subscribe() {
		subscribeTrabalhadorToVaga(vaga.id, trabalhador.cpf, authToken)
			.then(() => {
				dispatch({
					type: 'subscribeToVaga',
					vagaId: vaga.id
				})
				navigation.navigate('Feed')
			})
			.catch((err) => {
				Alert.alert('Erro', err, [{ text: 'Ok' }])
			})
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{vaga.titulo}</Text>
			<ScrollView
				contentContainerStyle={styles.scrollViewContent}
				style={styles.scrollView}
			>
				<View style={styles.vagaInfo}>
					<View style={styles.vagaProperty}>
						<Text style={styles.vagaPropertyName}>ID: </Text>
						<Text style={styles.vagaPropertyText}>{vaga.id}</Text>
					</View>
					<View style={styles.vagaProperty}>
						<Text style={styles.vagaPropertyName}>Salario: </Text>
						<Text style={styles.vagaPropertyText}>R$ {vaga.salario}</Text>
					</View>
					<View style={styles.vagaProperty}>
						<Text style={styles.vagaPropertyName}>Localização: </Text>
						<Text style={styles.vagaPropertyText}>{vaga.localizacao}</Text>
					</View>
					<View style={styles.vagaProperty}>
						<Text style={styles.vagaPropertyName}>Categoria: </Text>
						<Text style={styles.vagaPropertyText}>{vaga.categoria}</Text>
					</View>
					<View style={styles.vagaDescricao}>
						<Text style={styles.vagaDescricaoName}>Descrição: </Text>
						<Text style={styles.vagaPropertyText}>{vaga.descricao}</Text>
					</View>
				</View>
				{subscribed ? (
					<Text style={styles.subscribedText}>
						Você está inscrito nessa vaga
					</Text>
				) : (
					<View style={styles.buttonsView}>
						<AppButton
							title="Se Inscrever"
							onPress={handleSubscribeButton}
							style={{ marginRight: 10 }}
						/>
					</View>
				)}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: {
		fontSize: 40,
		textAlign: 'center',
		marginTop: 30,
		color: '#009688',
		maxWidth: '80%'
	},
	scrollView: {
		marginBottom: 20,
		marginTop: 25,
		width: '80%'
	},
	vagaProperty: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 10
	},
	vagaPropertyName: { fontWeight: 'bold', fontSize: 25 },
	vagaPropertyText: { fontSize: 25 },
	vagaDescricao: {
		flexDirection: 'column',
		marginBottom: 10
	},
	vagaDescricaoName: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 5
	},
	buttonsView: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 30,
		marginBottom: 10
	},
	subscribedText: {
		color: 'red',
		fontSize: 23,
		textAlign: 'center',
		marginTop: 40
	}
})
