import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import TrabalhadorProfileNotEdiatable from './TrabalhadorProfileNotEditable'
import TrabalhadorProfileEditable from './TrabalhadorProfileEditable'

export default function TrabalhadorProfile({}) {
	const [beingEdited, setBeingEdited] = useState(false)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Seu Perfil</Text>
			{beingEdited ? (
				<TrabalhadorProfileEditable setBeingEdited={setBeingEdited} />
			) : (
				<TrabalhadorProfileNotEdiatable setBeingEdited={setBeingEdited} />
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
		marginBottom: 30,
		color: '#009688'
	}
})
