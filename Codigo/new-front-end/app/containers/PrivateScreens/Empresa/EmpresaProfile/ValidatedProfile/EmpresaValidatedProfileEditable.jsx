import React, { useState, useContext } from 'react'
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
	Alert,
	TouchableOpacity
} from 'react-native'
import { editEmpresa, getEmpresa } from '../../../../../API/EmpresaAPI'
import { DispatchContext, StateContext } from '../../../../../contexts'
import AppButton from '../../../../../components/AppButton'
import AppTextInput from '../../../../../components/AppTextInput'
import AppNumericInput from '../../../../../components/AppNumericInput'

export default function EmpresaValidatedProfileEditable({ setBeingEdited }) {
	const [changes, setChanges] = useState({})
	const dispatch = useContext(DispatchContext)
	const state = useContext(StateContext)
	const { userData: empresa } = state

	const [razaoSocial, setRazaoSocial] = useState(empresa.razaoSocial)
	const [site, setSite] = useState(empresa.site)
	const [telefoneDeContato, setTelefoneDeContato] = useState(
		empresa.telefoneDeContato
	)

	function handlePropertyOnEndEditing(propertyName, value) {
		return () => {
			setChanges((oldChanges) => {
				return { ...oldChanges, [propertyName]: value }
			})
		}
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

	function submitChanges() {
		editEmpresa(changes, state.userEmail, state.authToken)
			.then((empresa) => {
				dispatch({
					type: 'editUserData',
					userData: empresa
				})
				setBeingEdited(false)
			})
			.catch((err) => {
				Alert.alert('Erro', 'Houve um erro de conexão ao editar o seu perfil', [
					{ text: 'Ok' }
				])
			})
	}

	return (
		<ScrollView
			style={styles.scrollContainer}
			contentContainerStyle={{ alignItems: 'flex-start' }}
		>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Razão Social: </Text>
				<AppTextInput
					value={razaoSocial}
					onChangeText={(text) => setRazaoSocial(text)}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing('razaoSocial', razaoSocial)}
				/>
			</View>
			<View style={styles.profileProperty}>
				<Text style={styles.profilePropertyName}>Site: </Text>
				<AppTextInput
					value={site}
					onChangeText={(text) => setSite(text)}
					style={styles.input}
					onEndEditing={handlePropertyOnEndEditing('site', site)}
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
		marginTop: 50,
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
		width: '100%',
		marginTop: 20
	},
	input: {
		margin: 5,
		fontSize: 15
	}
})
