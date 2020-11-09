import React, { useContext } from 'react'
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity
} from 'react-native'
import { deleteEmpresa } from '../../../../../API/EmpresaAPI'
import { DispatchContext } from '../../../../../contexts'
import AppButton from '../../../../../components/AppButton'

export default function NotValidatedProfile({ empresa }) {
	const dispatch = useContext(DispatchContext)

	function handleExclusionClick() {
		Alert.alert(
			'Atenção!',
			'Você realmente deseja excluir seu perfil?\n Não será possível voltar atrás depois!',
			[
				{ text: 'Cancelar' },
				{
					text: 'Excluir',
					onPress: () => {
						deleteEmpresa(state.userEmail, state.authToken)
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

	function handleInvalidatedPress() {
		Alert.alert(
			'Perfil Inválidado!',
			'Espere até o administrador validar este perfil para poder criar novas vagas e editar seu perfil!',
			[{ text: 'Ok' }]
		)
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Seu Perfil</Text>
			<TouchableOpacity
				style={styles.invalidatedContainer}
				onPress={handleInvalidatedPress}
			>
				<Text style={styles.invalidatedMessage}>Perfil Inválidado</Text>
			</TouchableOpacity>
			<ScrollView
				contentContainerStyle={{ alignItems: 'flex-start' }}
				style={styles.scrollContainer}
			>
				<View style={styles.profileProperty}>
					<Text style={styles.profilePropertyName}>CNPJ: </Text>
					<Text style={styles.profilePropertyText}>{empresa.cnpj}</Text>
				</View>
				<View style={styles.profileProperty}>
					<Text style={styles.profilePropertyName}>Razão Social: </Text>
					<Text style={styles.profilePropertyText}>{empresa.razaoSocial}</Text>
				</View>
				<View style={styles.profileProperty}>
					<Text style={styles.profilePropertyName}>Site: </Text>
					<Text style={styles.profilePropertyText}>{empresa.site}</Text>
				</View>
				<View style={styles.profileProperty}>
					<Text style={styles.profilePropertyName}>Telefone de Contato: </Text>
					<Text style={styles.profilePropertyText}>
						{empresa.telefoneDeContato}
					</Text>
				</View>
				<View style={styles.profileProperty}>
					<Text style={styles.profilePropertyName}>Email: </Text>
					<Text style={styles.profilePropertyText}>{empresa.email}</Text>
				</View>

				<View style={styles.buttonsContainer}>
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
		marginBottom: 20,
		color: '#009688'
	},
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
	},
	invalidatedMessage: {
		fontSize: 22,
		color: 'red'
	},
	invalidatedContainer: {
		marginBottom: 10
	}
})
