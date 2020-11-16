import React, { useEffect, useContext, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getAllTrabalhadoresFromVaga } from '../../../../../API/VagaAPI'
import { StateContext } from '../../../../../contexts'
import TrabalhadorRelatedToVaga from './TrabalhadorRelatedToVaga'

export default function VisualizarVaga({ route, navigation }) {
	const { vaga } = route.params
	const { authToken } = useContext(StateContext)
	const [trabalhadores, setTrabalhadores] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		getAllTrabalhadoresFromVaga(vaga.id, authToken)
			.then((trabalhadores) => {
				setTrabalhadores(trabalhadores)
				setIsLoading(false)
			})
			.catch((err) => {
				setIsLoading(false)
				Alert.alert('Erro', err, [{ text: 'Ok' }])
			})
	}, [vaga])

	function getTrabalhadoresView() {
		if (isLoading) {
			return <Text style={styles.loadingMessage}>Carregando ...</Text>
		}
		if (trabalhadores.length === 0) {
			return (
				<Text style={styles.emptyArrayMessage}>
					Nenhum trabalhador ainda se inscreveu para essa vaga
				</Text>
			)
		} else {
			return (
				<View>
					<Text style={styles.inscricoesTitle}>Trabalhadores Inscritos:</Text>
					{getTrabalhadoresAsComponents()}
				</View>
			)
		}
	}

	function getTrabalhadoresAsComponents() {
		return trabalhadores.map((trabalhador, index) => (
			<TrabalhadorRelatedToVaga
				trabalhador={trabalhador}
				key={index}
				navigation={navigation}
			/>
		))
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
				<View style={styles.trabalhadoresView}>{getTrabalhadoresView()}</View>
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
		fontSize: 30,
		textAlign: 'center',
		marginTop: 30
	},
	scrollView: {
		marginBottom: 20,
		marginTop: 25,
		width: '80%'
	},
	scrollViewContent: {},
	vagaInfo: {},
	vagaProperty: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 10
	},
	vagaPropertyName: { fontWeight: 'bold', fontSize: 17 },
	vagaPropertyText: { fontSize: 17 },
	vagaDescricao: {
		flexDirection: 'column',
		marginBottom: 10
	},
	vagaDescricaoName: {
		fontWeight: 'bold',
		fontSize: 17,
		marginBottom: 5
	},
	trabalhadoresView: {
		marginTop: 15
	},
	emptyArrayMessage: {
		textAlign: 'center',
		color: 'red',
		fontSize: 17
	},
	inscricoesTitle: {
		fontSize: 20,
		textAlign: 'center',
		color: '#009688',
		marginBottom: 20
	},
	loadingMessage: {
		textAlign: 'center',
		fontSize: 17
	}
})
