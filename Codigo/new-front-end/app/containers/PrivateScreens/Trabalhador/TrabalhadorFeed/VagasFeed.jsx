import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StateContext } from '../../../../contexts'
import VagaMinimized from './VagaMinimized'
import { getVagasIdsRelatedToTrabalhador } from '../../../../API/VagaAPI'

export default function VagasFeed({ navigation, route }) {
	const {
		userEmail,
		authToken,
		userData: trabalhador,
		vagasData: vagas,
		subscribedVagasIds
	} = useContext(StateContext)

	function getAllVagasAsComponents() {
		if (vagas.length >= 1) {
			return vagas.map((vaga, index, array) => {
				const subscribed = subscribedVagasIds.includes(vaga.id)

				return (
					<VagaMinimized
						vaga={vaga}
						key={vaga.id}
						navigation={navigation}
						subscribed={subscribed}
					/>
				)
			})
		} else {
			return (
				<Text style={styles.invalidatedMessage}>
					Ainda não existem vagas disponíveis.
				</Text>
			)
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Vagas</Text>
			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollViewContainer}
			>
				{getAllVagasAsComponents()}
			</ScrollView>
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
	},
	invalidatedMessage: {
		fontSize: 22,
		color: 'red'
	},
	invalidatedContainer: {
		marginBottom: 10,
		marginTop: 10
	},
	scrollView: {
		width: '100%'
	},
	scrollViewContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	loadingMessage: {
		textAlign: 'center',
		fontSize: 17
	}
})
