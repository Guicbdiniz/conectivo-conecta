import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function TrabalhadorFeed({}) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Feed</Text>
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
