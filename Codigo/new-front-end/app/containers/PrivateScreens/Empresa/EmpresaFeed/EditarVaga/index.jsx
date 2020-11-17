import React, { useContext, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { editVaga } from '../../../../../API/VagaAPI'
import AppButton from '../../../../../components/AppButton'
import AppNumericInput from '../../../../../components/AppNumericInput'
import AppTextInput from '../../../../../components/AppTextInput'
import { DispatchContext, StateContext } from '../../../../../contexts'

export default function EditarVaga({ route, navigation }) {
	const { vaga } = route.params
	const [changes, setChanges] = useState({})
	const dispatch = useContext(DispatchContext)
	const state = useContext(StateContext)
	const { userData: empresa } = state

	const [titulo, setTitulo] = useState(vaga.titulo)
	const [salario, setSalario] = useState(vaga.salario)
	const [descricao, setDescricao] = useState(vaga.descricao)
	const [categoria, setCategoria] = useState(vaga.categoria)
	const [localizacao, setLocalizacao] = useState(vaga.localizacao)

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
		editVaga(vaga.id, changes, state.authToken)
			.then((vaga) => {
				dispatch({
					type: 'editVaga',
					vaga: vaga
				})
				navigation.navigate('Visualizar Vaga', { vaga: vaga })
			})
			.catch((err) => {
				Alert.alert('Erro', err.toString(), [{ text: 'Ok' }])
			})
	}

	function handlePropertyOnEndEditing(propertyName, value) {
		return () => {
			const realValue = propertyName === 'salario' ? parseFloat(value) : value

			setChanges((oldChanges) => {
				return { ...oldChanges, [propertyName]: realValue }
			})
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>ID da Vaga: {vaga.id}</Text>
			<ScrollView
				contentContainerStyle={{ alignItems: 'center' }}
				style={{ marginBottom: 20, width: '80%' }}
			>
				<Text style={styles.textLabel}>Título da Vaga</Text>
				<AppTextInput
					value={titulo}
					onChangeText={(text) => setTitulo(text)}
					style={styles.textInput}
					maxLength={50}
					autoCapitalize="words"
					onEndEditing={handlePropertyOnEndEditing('titulo', titulo)}
				/>
				<Text style={styles.textLabel}>Salário</Text>
				<AppNumericInput
					value={salario.toString()}
					setValue={setSalario}
					style={styles.textInput}
					maxLength={10}
					onEndEditing={handlePropertyOnEndEditing('salario', salario)}
				/>
				<Text style={styles.textLabel}>Localização</Text>
				<AppTextInput
					value={localizacao}
					onChangeText={(text) => setLocalizacao(text)}
					style={styles.textInput}
					maxLength={30}
					autoCapitalize="words"
					onEndEditing={handlePropertyOnEndEditing('localizacao', localizacao)}
				/>
				<Text style={styles.textLabel}>Categoria</Text>
				<AppTextInput
					value={categoria}
					onChangeText={(text) => setCategoria(text)}
					style={styles.textInput}
					maxLength={30}
					autoCapitalize="words"
					onEndEditing={handlePropertyOnEndEditing('categoria', categoria)}
				/>
				<Text style={styles.textLabel}>Descrição</Text>
				<AppTextInput
					value={descricao}
					onChangeText={(text) => setDescricao(text)}
					style={styles.longTextInput}
					maxLength={1024}
					multiline={true}
					numberOfLines={10}
					onEndEditing={handlePropertyOnEndEditing('descricao', descricao)}
				/>
				<AppButton title="Salvar" onPress={handleEditClick} margin={10} />
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
		fontSize: 30,
		textAlign: 'center',
		marginTop: 30,
		marginBottom: 30
	},
	textInput: {
		marginBottom: 20,
		height: 50,
		fontSize: 20,
		width: '100%'
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
		textAlignVertical: 'top',
		width: '100%'
	}
})
