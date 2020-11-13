import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import EmpresaValidatedProfileNotEditable from './EmpresaValidatedProfileNotEditable'
import EmpresaValidatedProfileEditable from './EmpresaValidatedProfileEditable'

export default function EmpresaValidatedProfile({}) {
	const [beingEdited, setBeingEdited] = useState(false)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Seu Perfil</Text>
			{beingEdited ? (
				<EmpresaValidatedProfileEditable setBeingEdited={setBeingEdited} />
			) : (
				<EmpresaValidatedProfileNotEditable setBeingEdited={setBeingEdited} />
			)}
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
		marginBottom: 45,
		color: '#009688'
	}
})
