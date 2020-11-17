import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function VisualizarTrabalhador({ route }) {
	const { trabalhador } = route.params

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Trabalhador</Text>
			<ScrollView
				contentContainerStyle={styles.trabalhadorInfo}
				style={{ width: '90%', marginBottom: 30 }}
			>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>CPF: </Text>
					<Text style={styles.trabalhadorPropertyText}>{trabalhador.cpf}</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Nome Completo: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.nomeCompleto}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Email: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.email}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Nome Completo da Mãe:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.nomeCompletoMae}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Número de RG: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.numeroDeRg}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Data de Nascimento:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.dataDeNascimento}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Local de Nascimento:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.localDeNascimento}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Estado Civil: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.estadoCivil}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Escolaridade: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.escolaridade}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Número de Filhos: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.numeroDeFilhos}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Telefone de Contato:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.telefoneDeContato}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Endereço: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.endereco}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>Número de Filhos: </Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.numeroDeFilhos}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Objetivo Profissional:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.objetivoProfissional}
					</Text>
				</View>
				<View style={styles.trabalhadorProperty}>
					<Text style={styles.trabalhadorPropertyName}>
						Resumo Profissional:{' '}
					</Text>
					<Text style={styles.trabalhadorPropertyText}>
						{trabalhador.resumoProfissional}
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignSelf: 'center',
		width: '90%'
	},
	title: {
		marginTop: 30,
		marginBottom: 30,
		fontSize: 40,
		color: '#009688'
	},
	trabalhadorInfo: {
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	trabalhadorProperty: {
		flexDirection: 'column',
		width: '100%',
		alignItems: 'flex-start',
		marginBottom: 10
	},
	trabalhadorPropertyName: { fontWeight: 'bold', fontSize: 17 },
	trabalhadorPropertyText: { fontSize: 17 }
})
