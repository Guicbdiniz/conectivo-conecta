import React, { useState, useContext } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/AppTextInput'
import { createEmpresa } from '../../../API/EmpresaAPI'
import { DispatchContext } from '../../../contexts'
import AppNumericInput from '../../../components/AppNumericInput'

/**
 * Empresa registration form component.
 */
export default function RegisterEmpresaForm() {
	const dispatch = useContext(DispatchContext)

	const [cnpj, setCnpj] = useState('')
	const [email, setEmail] = useState('')
	const [razaoSocial, setRazaoSocial] = useState('')
	const [site, setSite] = useState('')
	const [telefoneDeContato, setTelefoneDeContato] = useState('')
	const [senha, setSenha] = useState('')
	const [secondPassword, setSecondPassword] = useState('')

	function getSecondPasswordStyle() {
		const doPasswordsMatch = senha === secondPassword

		return doPasswordsMatch
			? styles.textInput
			: [styles.textInput, { backgroundColor: '#facac5' }]
	}

	function handleRegisterSubmit() {
		if (!(cnpj && email && razaoSocial && senha)) {
			Alert.alert('Erro', 'Preencha todos os dados marcados com "*"', [
				{ text: 'Ok' }
			])
		} else if (senha !== secondPassword) {
			Alert.alert('Erro', 'As senhas não batem', [{ text: 'Ok' }])
		} else {
			const empresa = {
				cnpj: cnpj,
				razaoSocial: razaoSocial,
				email: email
			}

			if (site !== '') {
				empresa.site = site
			}

			if (telefoneDeContato != '') {
				empresa.telefoneDeContato = telefoneDeContato
			}

			const conta = {
				email: email,
				senha: senha
			}

			createEmpresa(empresa, conta)
				.then((data) => {
					console.log(data)
					const { message, empresa, conta, token } = data
					Alert.alert('Sucesso', 'Empresa criada com sucesso.', [
						{
							text: 'ok',
							onPress: () => {
								dispatch({
									type: 'logIn',
									userType: 'EMPRESA',
									userEmail: email,
									authToken: token
								})
							}
						}
					])
				})
				.catch((err) => {
					Alert.alert('Erro', err, [{ text: 'Ok' }])
				})
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Registro de Empresa</Text>
			<ScrollView
				contentContainerStyle={{ alignItems: 'center' }}
				style={{ marginBottom: 50 }}
			>
				<Text style={styles.textLabel}>CNPJ*</Text>
				<AppNumericInput
					value={cnpj}
					setValue={setCnpj}
					style={styles.textInput}
					maxLength={14}
				/>
				<Text style={styles.textLabel}>Email*</Text>
				<AppTextInput
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.textInput}
					maxLength={30}
				/>
				<Text style={styles.textLabel}>Razão Social*</Text>
				<AppTextInput
					value={razaoSocial}
					onChangeText={(text) => setRazaoSocial(text)}
					style={styles.textInput}
					maxLength={50}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Site</Text>
				<AppTextInput
					value={site}
					onChangeText={(text) => setSite(text)}
					style={styles.textInput}
					maxLength={30}
				/>
				<Text style={styles.textLabel}>Telefone de Contato</Text>
				<AppTextInput
					value={telefoneDeContato}
					onChangeText={(text) => setTelefoneDeContato(text)}
					style={styles.textInput}
					maxLength={15}
				/>
				<Text style={styles.textLabel}>Senha*</Text>
				<AppTextInput
					value={senha}
					onChangeText={(text) => setSenha(text)}
					style={styles.textInput}
					maxLength={15}
					secureTextEntry={true}
				/>
				<Text style={styles.textLabel}>Confirme a Senha*</Text>
				<AppTextInput
					value={secondPassword}
					onChangeText={(text) => setSecondPassword(text)}
					style={getSecondPasswordStyle()}
					maxLength={15}
					secureTextEntry={true}
				/>
				<AppButton
					title="Registrar"
					onPress={handleRegisterSubmit}
					margin={10}
				/>
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
		fontSize: 30,
		marginTop: 30,
		marginBottom: 30
	},
	textInput: {
		marginBottom: 20,
		height: 50,
		fontSize: 20
	},
	textLabel: {
		fontSize: 20
	}
})
