import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
	Button,
	Alert
} from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Text>oI</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'orange',
		alignItems: 'center',
		justifyContent: 'center'
	}
})
