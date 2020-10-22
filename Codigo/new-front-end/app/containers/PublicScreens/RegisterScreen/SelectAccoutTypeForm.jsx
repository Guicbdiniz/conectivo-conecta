import React from 'react'
import {
	StyleSheet,
	TouchableWithoutFeedback,
	View,
	Text,
	Button
} from 'react-native'
import AppButton from '../../../components/AppButton'

/**
 * Component to select witch type of account will be registered.
 */
export default function SelectAccoutTypeForm({ setAccoutType }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Escolha o tipo de conta a ser criada:</Text>

			<AppButton
				title="Trabalhador"
				onPress={() => setAccoutType('TRABALHADOR')}
				margin={10}
				fontSize={30}
			/>
			<AppButton
				title="Empresa"
				onPress={() => setAccoutType('EMPRESA')}
				margin={30}
				fontSize={30}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	title: {
		fontSize: 50,
		textAlign: 'center',
		marginBottom: 70
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
})
