import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function AppButton({
	onPress,
	title,
	margin,
	fontSize,
	backgroundColor
}) {
	function getContainerStyle() {
		return [
			styles.appButtonContainer,
			margin && { margin },
			backgroundColor && { backgroundColor }
		]
	}

	function getTextStyle() {
		return [styles.appButtonText, fontSize && { fontSize }]
	}

	return (
		<TouchableOpacity onPress={onPress} style={getContainerStyle()}>
			<Text style={getTextStyle()}>{title}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	appButtonContainer: {
		elevation: 8,
		backgroundColor: '#009688',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	appButtonText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase'
	}
})
