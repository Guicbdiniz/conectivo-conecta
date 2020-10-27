import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function AppDateInput({
	value,
	setValue,
	style,
	maxLength,
	onEndEditing
}) {
	function getDateInputStyles() {
		return [styles.textInput, style]
	}

	function getTextWithDateLayout(text) {
		const numericText = text.replace(/[^0-9/]/g, '')

		if (numericText.length === 3) {
			if (numericText.charAt(2) === '/') {
				return numericText.slice(0, 2)
			} else {
				return numericText.slice(0, 2) + '/' + numericText.charAt(2)
			}
		} else if (numericText.length === 6) {
			if (numericText.charAt(5) === '/') {
				return numericText.slice(0, 5)
			} else {
				return numericText.slice(0, 5) + '/' + numericText.charAt(5)
			}
		} else return numericText
	}

	return (
		<TextInput
			value={value}
			onChangeText={(text) => {
				setValue(getTextWithDateLayout(text))
			}}
			style={getDateInputStyles()}
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
