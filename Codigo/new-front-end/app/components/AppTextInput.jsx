import React from 'react'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function AppTextInput({
	value,
	onChangeText,
	style,
	secureTextEntry,
	autoCapitalize,
	maxLength,
	keyboardType,
	multiline,
	numberOfLines,
	onEndEditing
}) {
	function getTextInputStyles() {
		return [styles.textInput, style]
	}

	return (
		<TextInput
			value={value}
			onChangeText={onChangeText}
			style={getTextInputStyles()}
			secureTextEntry={secureTextEntry ? secureTextEntry : false}
			autoCapitalize={autoCapitalize ? autoCapitalize : 'none'}
			maxLength={maxLength ? maxLength : 50}
			keyboardType={keyboardType ? keyboardType : 'default'}
			multiline={multiline ? multiline : false}
			numberOfLines={multiline && numberOfLines ? numberOfLines : null}
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
