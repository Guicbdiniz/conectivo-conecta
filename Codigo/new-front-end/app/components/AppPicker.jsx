import React from 'react'
import { Picker, StyleSheet, View } from 'react-native'

export default function AppPicker({
	items,
	style,
	selectedValue,
	onValueChange
}) {
	function getPickerStyles() {
		return [styles.container, style]
	}

	return (
		<View style={getPickerStyles()}>
			<Picker
				style={styles.picker}
				selectedValue={selectedValue}
				onValueChange={onValueChange}
			>
				{items.map((item, index) => (
					<Picker.Item label={item.label} value={item.value} key={index} />
				))}
			</Picker>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: 250,
		borderWidth: 1,
		padding: 10,
		borderRadius: 20,
		fontSize: 20,
		justifyContent: 'center'
	},
	picker: {}
})
