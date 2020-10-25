import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getTrabalhador } from '../../../../API/TrabalhadorAPI'
import { StateContext } from '../../../../contexts'

export default function TrabalhadorProfile({}) {
	const state = useContext(StateContext)
	const [trabalhador, setTrabalhador] = useState({
		cpf: '',
		nomeCompleto: '',
		nomeCompletoMae: '',
		numeroDeRG: '',
		dataDeNascimento: '',
		localDeNascimento: '',
		estadoCivil: '',
		numeroDeFilhos: '',
		telefoneDeContato: '',
		endereco: '',
		escolaridade: '',
		objetivoProfissional: '',
		resumoProfissional: '',
		email: '',
		caminhoParaImagem: '',
		caminhoParaCurriculo: ''
	})

	useEffect(() => {
		getTrabalhador(state.userEmail, state.authToken)
			.then((trabalhador) => {
				setTrabalhador(trabalhador), console.log(trabalhador)
			})
			.catch((err) => {
				Alert.alert(
					'Erro',
					'Houve um erro de conexão ao buscar os dados do seu perfil',
					[{ text: 'Ok' }]
				)
			})
	}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Seu Perfil</Text>
			<ScrollView
				contentContainerStyle={{ alignItems: 'flex-start' }}
				style={styles.scrollContainer}
			>
				<Text style={styles.profileProperty}>
					Nome: {trabalhador.nomeCompleto}
				</Text>
				<Text style={styles.profileProperty}>CPF: {trabalhador.cpf}</Text>
				<Text style={styles.profileProperty}>Email: {trabalhador.email}</Text>
				<Text style={styles.profileProperty}>CPF: {trabalhador.cpf}</Text>
				<Text style={styles.profileProperty}>
					Data de Nascimento: {trabalhador.dataDeNascimento}
				</Text>
				<Text style={styles.profileProperty}>
					Estado Civil: {trabalhador.estadoCivil}
				</Text>
				<Text style={styles.profileProperty}>
					Local de Nascimento: {trabalhador.localDeNascimento}
				</Text>
				<Text style={styles.profileProperty}>
					Nome Completo Mãe: {trabalhador.nomeCompletoMae}
				</Text>
				<Text style={styles.profileProperty}>
					Número de Filhos: {trabalhador.numeroDeFilhos}
				</Text>
				<Text style={styles.profileProperty}>
					Telefone De Contato: {trabalhador.telefoneDeContato}
				</Text>
				<Text style={styles.profileProperty}>
					Escolaridade: {trabalhador.escolaridade}
				</Text>
				<Text style={styles.profileProperty}>
					Objetivo Profissional: {trabalhador.objetivoProfissional}
				</Text>
				<Text style={styles.profileProperty}>
					Endereço: {trabalhador.endereco}
				</Text>
				<Text style={styles.profileProperty}>
					Resumo Profissional: {trabalhador.resumoProfissional}
				</Text>
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
	scrollContainer: {
		marginBottom: 50,
		maxWidth: '80%'
	},
	profileProperty: {
		fontSize: 25,
		marginBottom: 30
	}
})
