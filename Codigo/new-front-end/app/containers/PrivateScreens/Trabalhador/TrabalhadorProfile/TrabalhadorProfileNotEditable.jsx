import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native'
import {
	getTrabalhador,
	deleteTrabalhador
} from '../../../../API/TrabalhadorAPI'
import AppButton from '../../../../components/AppButton'
import { DispatchContext, StateContext } from '../../../../contexts'

export default function TrabalhadorProfileNotEdiatable({
	setBeingEdited,
	setSharedTrabalhador
}) {
	const dispatch = useContext(DispatchContext)
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

	function handleExclusionClick() {
		Alert.alert(
			'Atenção!',
			'Você realmente deseja excluir seu perfil?\n Não será possível voltar atrás depois!',
			[
				{ text: 'Cancelar' },
				{
					text: 'Excluir',
					onPress: () => {
						deleteTrabalhador(state.userEmail, state.authToken)
							.then(() => {
								Alert.alert('Perfil deletado', '', [
									{
										text: 'Ok',
										onPress: () => {
											dispatch({ type: 'logOut' })
										}
									}
								])
							})
							.catch((err) => {
								Alert.alert(
									'Erro',
									'Houve um erro de conexão ao deletar o seu perfil',
									[{ text: 'Ok' }]
								)
							})
					}
				}
			]
		)
	}

	function handleEditButton() {
		setSharedTrabalhador(trabalhador)
		setBeingEdited(true)
	}

	return (
		<ScrollView
			contentContainerStyle={{ alignItems: 'flex-start' }}
			style={styles.scrollContainer}
		>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Nome: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.nomeCompleto}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>CPF: </Text>
				<Text style={styles.profilePropertyText}>{trabalhador.cpf}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Número de RG: </Text>
				<Text style={styles.profilePropertyText}>{trabalhador.numeroDeRG}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Email: </Text>
				<Text style={styles.profilePropertyText}>{trabalhador.email}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Data de Nascimento: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.dataDeNascimento}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Estado Civil: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.estadoCivil}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Local de Nascimento: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.localDeNascimento}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Nome Completo Mãe: </Text>
				<Text>{trabalhador.nomeCompletoMae}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Número de Filhos: </Text>
				<Text>{trabalhador.numeroDeFilhos}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Telefone de Contato: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.telefoneDeContato}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Escolaridade: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.escolaridade}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Objetivo Profissional:</Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.objetivoProfissional}
				</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Endereço: </Text>
				<Text style={styles.profilePropertyText}>{trabalhador.endereco}</Text>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Resumo Profissional: </Text>
				<Text style={styles.profilePropertyText}>
					{trabalhador.resumoProfissional}
				</Text>
			</View>
			<View style={styles.buttonsContainer}>
				<AppButton title="Editar" margin={5} onPress={handleEditButton} />
				<AppButton
					title="Desconectar"
					margin={10}
					onPress={() => {
						dispatch({
							type: 'logOut'
						})
					}}
				/>
				<AppButton
					title="Excluir"
					margin={5}
					backgroundColor="red"
					onPress={handleExclusionClick}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	scrollContainer: {
		marginBottom: 25,
		width: '80%'
	},
	profileProperty: {
		marginBottom: 25,
		width: '100%'
	},
	profilePropertyName: {
		fontWeight: 'bold'
	},
	profilePropertyText: {
		fontSize: 20
	},
	buttonsContainer: {
		alignItems: 'center',
		width: '100%'
	}
})
