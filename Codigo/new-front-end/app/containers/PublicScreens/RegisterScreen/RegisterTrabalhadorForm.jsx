import React, { useState, useContext } from 'react'
import { Alert, StyleSheet, Text, View, Picker, Linking } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { createTrabalhador } from '../../../API/TrabalhadorAPI'
import AppButton from '../../../components/AppButton'
import AppTextInput from '../../../components/AppTextInput'
import AppNumericInput from '../../../components/AppNumericInput'
import AppDateInput from '../../../components/AppDateInput'
import AppPicker from '../../../components/AppPicker'
import { DispatchContext } from '../../../contexts'

export default function RegisterTrabalhadorForm() {
	const [cpf, setCpf] = useState('')
	const [nomeCompleto, setNomeCompleto] = useState('')
	const [nomeCompletoMae, setNomeCompletoMae] = useState('')
	const [numeroDeRg, setNumeroDeRG] = useState('')
	const [dataDeNascimento, setDataDeNascimento] = useState('')
	const [localDeNascimento, setLocalDeNascimento] = useState('')
	const [estadoCivil, setEstadoCivil] = useState('')
	const [numeroDeFilhos, setNumeroDeFilhos] = useState('')
	const [telefoneDeContato, setTelefoneDeContato] = useState('')
	const [endereco, setEndereco] = useState('')
	const [escolaridade, setEscolaridade] = useState('')
	const [objetivoProfissional, setObjetivoProfissional] = useState('')
	const [resumoProfissional, setResumoProfissional] = useState('')
	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [secondPassword, setSecondPassword] = useState('')

	const dispatch = useContext(DispatchContext)

	function getSecondPasswordStyle() {
		const doPasswordsMatch = senha === secondPassword

		return doPasswordsMatch
			? styles.textInput
			: [styles.textInput, { backgroundColor: '#facac5' }]
	}

	function handleRegisterSubmit() {
		if (
			!(
				cpf &&
				nomeCompleto &&
				nomeCompletoMae &&
				numeroDeRg &&
				dataDeNascimento &&
				localDeNascimento &&
				estadoCivil &&
				numeroDeFilhos &&
				telefoneDeContato &&
				endereco &&
				escolaridade &&
				objetivoProfissional &&
				resumoProfissional &&
				email &&
				senha
			)
		) {
			Alert.alert('Erro', 'Preencha todos os dados marcados com "*"', [
				{ text: 'Ok' }
			])
		} else if (senha !== secondPassword) {
			Alert.alert('Erro', 'As senhas não batem', [{ text: 'Ok' }])
		} else {
			const trabalhador = {
				cpf: cpf,
				nomeCompleto: nomeCompleto,
				nomeCompletoMae: nomeCompletoMae,
				numeroDeRG: parseInt(numeroDeRg),
				dataDeNascimento: dataDeNascimento,
				localDeNascimento: localDeNascimento,
				estadoCivil: estadoCivil,
				numeroDeFilhos: parseInt(numeroDeFilhos),
				telefoneDeContato: telefoneDeContato,
				email: email,
				endereco: endereco,
				escolaridade: escolaridade,
				objetivoProfissional: objetivoProfissional,
				resumoProfissional: resumoProfissional
			}

			const conta = {
				email: email,
				senha: senha
			}

			createTrabalhador(trabalhador, conta)
				.then((data) => {
					const { message, trabalhador, conta, token } = data
					Alert.alert('Sucesso', 'Trabalhador criado com sucesso.', [
						{
							text: 'ok',
							onPress: () => {
								dispatch({
									type: 'logIn',
									userType: 'TRABALHADOR',
									userEmail: email,
									authToken: token,
									userData: trabalhador
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
			<Text style={styles.title}>Registro de Trabalhador</Text>
			<ScrollView
				contentContainerStyle={{ alignItems: 'center' }}
				style={{ marginBottom: 50 }}
			>
				<Text style={styles.textLabel}>CPF*</Text>
				<AppNumericInput
					value={cpf}
					setValue={setCpf}
					style={styles.textInput}
					maxLength={11}
				/>
				<Text style={styles.textLabel}>Nome Completo*</Text>
				<AppTextInput
					value={nomeCompleto}
					onChangeText={(text) => setNomeCompleto(text)}
					style={styles.textInput}
					maxLength={45}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Nome Completo da Mãe*</Text>
				<AppTextInput
					value={nomeCompletoMae}
					onChangeText={(text) => setNomeCompletoMae(text)}
					style={styles.textInput}
					maxLength={45}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Numero de RG*</Text>
				<AppNumericInput
					value={numeroDeRg}
					setValue={setNumeroDeRG}
					style={styles.textInput}
					maxLength={8}
				/>
				<Text style={styles.textLabel}>Data de Nascimento*</Text>
				<AppDateInput
					value={dataDeNascimento}
					setValue={setDataDeNascimento}
					style={styles.textInput}
					maxLength={10}
				/>
				<Text style={styles.textLabel}>Local de Nascimento*</Text>
				<AppTextInput
					value={localDeNascimento}
					onChangeText={(text) => setLocalDeNascimento(text)}
					style={styles.textInput}
					maxLength={30}
				/>
				<Text style={styles.textLabel}>Estado Civil*</Text>
				<AppPicker
					items={[
						{ label: 'Selecione aqui', value: '' },
						{ label: 'Solteiro(a)', value: 'Solteiro(a)' },
						{ label: 'Casado(a)', value: 'Casado(a)' },
						{ label: 'Divorciado(a)', value: 'Divorciado(a)' },
						{ label: 'Viúvo(a)', value: 'Viúvo(a)' },
						{ label: 'Separado(a)', value: 'Separado(a)' }
					]}
					onValueChange={(itemValue) => setEstadoCivil(itemValue)}
					selectedValue={estadoCivil}
					style={{ marginBottom: 20 }}
				/>
				<Text style={styles.textLabel}>Numero de Filhos*</Text>
				<AppNumericInput
					value={numeroDeFilhos}
					setValue={setNumeroDeFilhos}
					style={styles.textInput}
					maxLength={2}
				/>
				<Text style={styles.textLabel}>Telefone de Contato*</Text>
				<AppNumericInput
					value={telefoneDeContato}
					setValue={setTelefoneDeContato}
					style={styles.textInput}
					maxLength={15}
				/>
				<Text style={styles.textLabel}>Endereço*</Text>
				<AppTextInput
					value={endereco}
					onChangeText={(text) => setEndereco(text)}
					style={styles.enderecoInput}
					maxLength={60}
					multiline={true}
					numberOfLines={2}
				/>
				<Text style={styles.textLabel}>Escolaridade*</Text>
				<AppPicker
					items={[
						{ label: 'Selecione aqui', value: '' },
						{
							label: 'Ensino Fundamental Incompleto',
							value: 'Ensino Fundamental Incompleto'
						},
						{
							label: 'Ensino Fundamental Completo',
							value: 'Ensino Fundamental Completo'
						},
						{
							label: 'Ensino Médio Incompleto',
							value: 'Ensino Médio Incompleto'
						},
						{
							label: 'Ensino Médio Completo',
							value: 'Ensino Médio Completo'
						},
						{
							label: 'Ensino Superior Incompleto',
							value: 'Ensino Superior Incompleto'
						},
						{
							label: 'Ensino Superior Completo',
							value: 'Ensino Superior Completo'
						}
					]}
					onValueChange={(itemValue) => setEscolaridade(itemValue)}
					selectedValue={escolaridade}
					style={{ marginBottom: 20 }}
				/>
				<Text style={styles.textLabel}>Objetivo Profissional*</Text>
				<AppTextInput
					value={objetivoProfissional}
					onChangeText={(text) => setObjetivoProfissional(text)}
					style={styles.longTextInput}
					maxLength={30000}
					multiline={true}
				/>
				<Text style={styles.textLabel}>Resumo Profissional*</Text>
				<AppTextInput
					value={resumoProfissional}
					onChangeText={(text) => setResumoProfissional(text)}
					style={styles.longTextInput}
					maxLength={30000}
					multiline={true}
				/>
				<Text style={styles.textLabel}>Email*</Text>
				<AppTextInput
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.textInput}
					maxLength={30}
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
				<View style={styles.container}>
				<Text style={styles.termos}>Ao criar a conta, você concorda com os termos e compromisos presentes em:</Text>
				<Text style={{color: 'blue', textDecorationStyle: "underline"}}
      				onPress={() => Linking.openURL('https://conectivoc.wixsite.com/conecta')}>
  				https://conectivoc.wixsite.com/conecta
				</Text>
				</View>
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
	},
	enderecoInput: {
		marginBottom: 20,
		height: 100,
		fontSize: 20,
		textAlignVertical: 'top'
	},
	longTextInput: {
		marginBottom: 20,
		height: 150,
		fontSize: 20,
		textAlignVertical: 'top'
	},
	termos: {
		color: "gray",
		textAlign: 'center',	
	}
})
