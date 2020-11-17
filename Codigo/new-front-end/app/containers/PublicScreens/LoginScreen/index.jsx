import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { getTrabalhador, loginTrabalhador } from '../../../API/TrabalhadorAPI'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/AppTextInput'
import AppPicker from '../../../components/AppPicker'
import { DispatchContext } from '../../../contexts'
import { getEmpresa, loginEmpresa } from '../../../API/EmpresaAPI'
import { getVagasFromCnpj } from '../../../API/VagaAPI'

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [accountType, setAccountType] = useState('')
	const dispatch = useContext(DispatchContext)

	function handleRegisterSubmit() {
		navigation.navigate('Registro')
	}

	function handleLoginSubmit() {
		if (!(email && password && accountType)) {
			Alert.alert(
				'Erro ao fazer login',
				'Preencha todos os dados corretamente!',
				[{ text: 'Ok' }]
			)
		} else {
			if (accountType === 'TRABALHADOR') {
				loginTrabalhador(email, password)
					.then(({ message, token }) => {
						getTrabalhador(email, token)
							.then((trabalhador) => {
								dispatch({
									type: 'logIn',
									userType: 'TRABALHADOR',
									userEmail: email,
									authToken: token,
									userData: trabalhador,
									vagasData: []
								})
							})
							.catch((err) => {
								throw err
							})
					})
					.catch((err) => {
						Alert.alert('Erro ao fazer login', err, [{ text: 'Ok' }])
					})
			}
			if (accountType === 'EMPRESA') {
				loginEmpresa(email, password)
					.then(({ message, token }) => {
						getEmpresa(email, token)
							.then((empresa) => {
								getVagasFromCnpj(empresa.cnpj, token)
									.then((vagas) => {
										dispatch({
											type: 'logIn',
											userType: 'EMPRESA',
											userEmail: email,
											authToken: token,
											userData: empresa,
											vagasData: vagas
										})
									})
									.catch((err) => {
										throw err
									})
							})
							.catch((err) => {
								throw err
							})
					})
					.catch((err) => {
						Alert.alert('Erro ao fazer login', err, [{ text: 'Ok' }])
					})
			}
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Conecta</Text>

			<Text>Email</Text>
			<AppTextInput
				style={styles.input}
				value={email}
				onChangeText={(text) => setEmail(text)}
			/>
			<Text>Senha</Text>
			<AppTextInput
				secureTextEntry={true}
				style={styles.input}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<Text>Tipo de Conta</Text>

			<AppPicker
				onValueChange={(itemValue) => setAccountType(itemValue)}
				selectedValue={accountType}
				items={[
					{ label: 'Selecione aqui', value: '' },
					{ label: 'Trabalhador', value: 'TRABALHADOR' },
					{ label: 'Empresa', value: 'EMPRESA' }
				]}
				style={styles.picker}
			></AppPicker>
			<AppButton title="Confirmar" onPress={handleLoginSubmit} margin={10} />
			<AppButton title="Registrar" onPress={handleRegisterSubmit} margin={10} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 80,
		color: '#009688',
		marginBottom: 50
	},
	input: {
		marginBottom: 20
	},
	picker: {
		marginBottom: 35
	}
})
