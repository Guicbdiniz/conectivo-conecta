import React, { useContext, useState } from 'react'
import { ScrollView, StyleSheet, View, Text, Alert } from 'react-native'
import AppButton from '../../../../components/AppButton'
import AppTextInput from '../../../../components/AppTextInput'
import AppNumericInput from '../../../../components/AppNumericInput'
import AppDateInput from '../../../../components/AppDateInput'
import AppPicker from '../../../../components/AppPicker'
import { editTrabalhador } from '../../../../API/TrabalhadorAPI'
import { StateContext, DispatchContext } from '../../../../contexts'

export default function TrabalhadorProfileEditable({ setBeingEdited }) {
	const dispatch = useContext(DispatchContext)
	const state = useContext(StateContext)
	const { userData: trabalhadorInitialData } = state
	const [changes, setChanges] = useState({})

	const [nomeCompleto, setNomeCompleto] = useState(
		trabalhadorInitialData.nomeCompleto
	)
	const [nomeCompletoMae, setNomeCompletoMae] = useState(
		trabalhadorInitialData.nomeCompletoMae
	)
	const [numeroDeRG, setNumeroDeRG] = useState(
		trabalhadorInitialData.numeroDeRG.toString()
	)
	const [dataDeNascimento, setDataDeNascimento] = useState(
		trabalhadorInitialData.dataDeNascimento
	)
	const [localDeNascimento, setLocalDeNascimento] = useState(
		trabalhadorInitialData.localDeNascimento
	)
	const [estadoCivil, setEstadoCivil] = useState(
		trabalhadorInitialData.estadoCivil
	)
	const [numeroDeFilhos, setNumeroDeFilhos] = useState(
		trabalhadorInitialData.numeroDeFilhos.toString()
	)
	const [telefoneDeContato, setTelefoneDeContato] = useState(
		trabalhadorInitialData.telefoneDeContato
	)
	const [endereco, setEndereco] = useState(trabalhadorInitialData.endereco)
	const [escolaridade, setEscolaridade] = useState(
		trabalhadorInitialData.escolaridade
	)
	const [objetivoProfissional, setObjetivoProfissional] = useState(
		trabalhadorInitialData.objetivoProfissional
	)
	const [resumoProfissional, setResumoProfissional] = useState(
		trabalhadorInitialData.resumoProfissional
	)

	function handlePropertyOnEndEditing(propertyName, value) {
		return () => {
			setChanges((oldChanges) => {
				return { ...oldChanges, [propertyName]: value }
			})
		}
	}

	function submitChanges() {
		editTrabalhador(changes, state.userEmail, state.authToken)
			.then((trabalhador) => {
				dispatch({
					type: 'editUserData',
					userData: trabalhador
				})
				setBeingEdited(false)
			})
			.catch((err) => {
				Alert.alert('Erro', 'Houve um erro de conexão ao editar o seu perfil', [
					{ text: 'Ok' }
				])
			})
	}

	function handleEditClick() {
		if (Object.keys(changes).length === 0) {
			Alert.alert('Erro!', 'Altere algum dado para salvar as alterações', [
				{ text: 'Ok' }
			])
		} else {
			const editedProperties = Object.keys(changes).join(', ')

			Alert.alert(
				'Atenção',
				`As seguinte propriedades serão alteradas: ${editedProperties}`,
				[{ text: 'Ok', onPress: submitChanges }, { text: 'Cancelar' }]
			)
		}
	}

	return (
		<ScrollView
			style={styles.scrollContainer}
			contentContainerStyle={{ alignItems: 'flex-start' }}
		>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Nome: </Text>
				<AppTextInput
					value={nomeCompleto}
					onChangeText={(text) => setNomeCompleto(text)}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'nomeCompleto',
						nomeCompleto
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Nome Completo Mãe: </Text>
				<AppTextInput
					value={nomeCompletoMae}
					onChangeText={(text) => setNomeCompletoMae(text)}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'nomeCompletoMae',
						nomeCompletoMae
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Numero de RG: </Text>
				<AppNumericInput
					value={numeroDeRG}
					setValue={setNumeroDeRG}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'numeroDeRG',
						parseInt(numeroDeRG)
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Data de Nascimento: </Text>
				<AppDateInput
					value={dataDeNascimento}
					setValue={setDataDeNascimento}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'dataDeNascimento',
						dataDeNascimento
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Local de Nascimento: </Text>
				<AppTextInput
					value={localDeNascimento}
					onChangeText={(text) => setLocalDeNascimento(text)}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'localDeNascimento',
						localDeNascimento
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Estado Civil: </Text>
				<AppPicker
					style={styles.input}
					items={[
						{ label: 'Solteiro(a)', value: 'Solteiro(a)' },
						{ label: 'Casado(a)', value: 'Casado(a)' },
						{ label: 'Divorciado(a)', value: 'Divorciado(a)' },
						{ label: 'Viúvo(a)', value: 'Viúvo(a)' },
						{ label: 'Separado(a)', value: 'Separado(a)' }
					]}
					onValueChange={(itemValue) => setEstadoCivil(itemValue)}
					selectedValue={estadoCivil}
					onEndEditing={handlePropertyOnEndEditing('estadoCivil', estadoCivil)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Numero de Filhos: </Text>
				<AppNumericInput
					value={numeroDeFilhos}
					setValue={setNumeroDeFilhos}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'numeroDeFilhos',
						parseInt(numeroDeFilhos)
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Telefone de Contato: </Text>
				<AppNumericInput
					value={telefoneDeContato}
					setValue={setTelefoneDeContato}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing(
						'telefoneDeContato',
						telefoneDeContato
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Escolaridade: </Text>
				<AppPicker
					style={styles.input}
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
					onEndEditing={handlePropertyOnEndEditing(
						'escolaridade',
						escolaridade
					)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Objetivo Profissional: </Text>
				<AppTextInput
					value={objetivoProfissional}
					onChangeText={(text) => setObjetivoProfissional(text)}
					style={styles.longInput}
					onEndEditing={handlePropertyOnEndEditing(
						'objetivoProfissional',
						objetivoProfissional
					)}
					maxLength={300}
					multiline={true}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Resumo Profissional: </Text>
				<AppTextInput
					value={resumoProfissional}
					onChangeText={(text) => setResumoProfissional(text)}
					style={styles.longInput}
					onEndEditing={handlePropertyOnEndEditing(
						'resumoProfissional',
						resumoProfissional
					)}
					maxLength={300}
					multiline={true}
				/>
			</View>
			<View style={styles.buttonsContainer}>
				<AppButton title="Salvar" margin={5} onPress={handleEditClick} />
				<AppButton
					title="Voltar"
					margin={10}
					onPress={() => {
						setBeingEdited(false)
					}}
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
	buttonsContainer: {
		alignItems: 'center',
		width: '100%'
	},
	input: {
		margin: 5,
		fontSize: 15
	},
	longInput: {
		margin: 5,
		fontSize: 15,
		height: 150,
		textAlignVertical: 'top'
	}
})
