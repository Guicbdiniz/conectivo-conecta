import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function AppNumericInput({
	value,
	setValue,
	style,
	maxLength,
	onEndEditing
}) {
	function getNumericInputStyles() {
		return [styles.textInput, style]
	}

	function getTextWithOnlyNumbers(text) {
		return text.replace(/[^0-9]/g, '')
	}

	return (
		<TextInput
			value={value}
			onChangeText={(text) => {
				setValue(getTextWithOnlyNumbers(text))
			}}
			style={getNumericInputStyles()}
			maxLength={maxLength ? maxLength : 50}
			keyboardType="numeric"
			onEndEditing={onEndEditing ? onEndEditing : null}
		/>
	)
}

const styles = StyleSheet.create({
	textInput: {
		height: 50,
		width: 250,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
		fontSize: 20
	}
})
