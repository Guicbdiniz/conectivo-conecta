import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { getEmpresa } from '../../../../API/EmpresaAPI'
import AppButton from '../../../../components/AppButton'
import AppNumericInput from '../../../../components/AppNumericInput'
import AppTextInput from '../../../../components/AppTextInput'
import { DispatchContext, StateContext } from '../../../../contexts'
import { createVaga } from '../../../../API/VagaAPI'

export default function ValidatedEmpresaNewJob({ empresa }) {
	const state = useContext(StateContext)

	const [titulo, setTitulo] = useState('')
	const [salario, setSalario] = useState('')
	const [descricao, setDescricao] = useState('')
	const [categoria, setCategoria] = useState('')
	const [localizacao, setLocalizacao] = useState('')

	function handleRegisterSubmit() {
		if (!(titulo && salario && descricao && categoria && localizacao)) {
			Alert.alert('Erro', 'Preencha todos os dados corretamente', [
				{ text: 'Ok' }
			])
		} else {
			const vaga = {
				cnpjDaEmpresa: empresa.cnpj,
				titulo: titulo,
				descricao: descricao,
				salario: parseFloat(salario),
				categoria: categoria,
				localizacao: localizacao
			}

			createVaga(vaga, state.authToken)
				.then((data) => {
					Alert.alert('Sucesso', 'Vaga criada com sucesso.', [
						{
							text: 'ok',
							onPress: () => {
								setCategoria('')
								setDescricao('')
								setLocalizacao('')
								setSalario('')
								setTitulo('')
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
			<Text style={styles.title}>Registro de Vaga</Text>
			<ScrollView
				contentContainerStyle={{ alignItems: 'center' }}
				style={{ marginBottom: 20 }}
			>
				<Text style={styles.textLabel}>CNPJ</Text>
				<AppNumericInput
					value={empresa.cnpj}
					setValue={(value) => {}}
					style={styles.textInput}
					maxLength={11}
					editable={false}
					selectTextOnFocus={false}
				/>
				<Text style={styles.textLabel}>Título da Vaga</Text>
				<AppTextInput
					value={titulo}
					onChangeText={(text) => setTitulo(text)}
					style={styles.textInput}
					maxLength={50}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Salário</Text>
				<AppNumericInput
					value={salario}
					setValue={setSalario}
					style={styles.textInput}
					maxLength={10}
				/>
				<Text style={styles.textLabel}>Localização</Text>
				<AppTextInput
					value={localizacao}
					onChangeText={(text) => setLocalizacao(text)}
					style={styles.textInput}
					maxLength={30}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Categoria</Text>
				<AppTextInput
					value={categoria}
					onChangeText={(text) => setCategoria(text)}
					style={styles.textInput}
					maxLength={30}
					autoCapitalize="words"
				/>
				<Text style={styles.textLabel}>Descrição</Text>
				<AppTextInput
					value={descricao}
					onChangeText={(text) => setDescricao(text)}
					style={styles.longTextInput}
					maxLength={1024}
					multiline={true}
					numberOfLines={10}
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
		fontSize: 47,
		marginTop: 60,
		marginBottom: 30,
		color: '#009688'
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
	}
})
