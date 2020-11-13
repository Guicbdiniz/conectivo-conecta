import React, { useContext, useEffect, useState } from 'react'
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { getEmpresa } from '../../../../API/EmpresaAPI'
import { getVagasFromCnpj } from '../../../../API/VagaAPI'
import { StateContext } from '../../../../contexts'
import VagaMinimized from './VagaMinimized'

export default function VagasFeed({ navigation }) {
	const {
		userEmail,
		authToken,
		userData: empresa,
		vagasData: vagas
	} = useContext(StateContext)

	function handleInvalidatedPress() {
		Alert.alert(
			'Perfil Inválidado',
			'Espere até o administrador validar este perfil para poder criar novas vagas e editar seu perfil.',
			[{ text: 'Ok' }]
		)
	}

	function getAllVagasAsComponents() {
		if (!empresa.eValido) {
			return (
				<TouchableOpacity
					style={styles.invalidatedContainer}
					onPress={handleInvalidatedPress}
				>
					<Text style={styles.invalidatedMessage}>Perfil Invalidado</Text>
				</TouchableOpacity>
			)
		}
		if (vagas.length > 1) {
			return vagas.map((vaga, index, array) => (
				<VagaMinimized vaga={vaga} key={vaga.id} navigation={navigation} />
			))
		} else {
			return (
				<Text style={styles.invalidatedMessage}>
					Você não possui vagas cadastradas.
				</Text>
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Minhas Vagas</Text>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollViewContainer}
			>
				{getAllVagasAsComponents()}
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
		textAlign: 'center',
		fontSize: 50,
		marginTop: 60,
		marginBottom: 30,
		color: '#009688'
	},
	invalidatedMessage: {
		fontSize: 22,
		color: 'red'
	},
	invalidatedContainer: {
		marginBottom: 10,
		marginTop: 10
	},
	scrollView: {
		width: '100%'
	},
	scrollViewContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
})
