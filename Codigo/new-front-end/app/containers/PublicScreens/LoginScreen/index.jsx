import React, { useContext, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { loginTrabalhador } from '../../../API/TrabalhadorAPI'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/AppTextInput'
import { DispatchContext } from '../../../contexts'

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useContext(DispatchContext)

	function handleRegisterSubmit() {
		navigation.navigate('Registro')
	}

	function handleLoginSubmit() {
		loginTrabalhador(email, password)
			.then(({ message, token }) => {
				dispatch({
					type: 'logIn',
					userType: 'TRABALHADOR',
					userEmail: email,
					authToken: token
				})
			})
			.catch((err) => {
				Alert.alert('Erro ao fazer login', err, [{ text: 'Ok' }])
			})
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
		marginBottom: 80
	},
	input: {
		marginBottom: 20
	}
})
