import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { StateContext } from '../../contexts'

export default function PrivateContainer() {
	const state = useContext(StateContext)

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Email from the user: {state.userEmail}</Text>
		</View>
	)
}
