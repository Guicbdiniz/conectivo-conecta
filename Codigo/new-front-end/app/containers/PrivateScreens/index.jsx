import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StateContext } from '../../contexts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TrabalhadorProfile from './Trabalhador/TrabalhadorProfile'
import TrabalhadorFeed from './Trabalhador/TrabalhadorFeed'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import EmpresaProfile from './Empresa/EmpresaProfile'

const ICONS_SIZE = 50
const ICONS_COLOR_NOT_ACTIVE = 'black'
const ICONS_COLOR_ACTIVE = '#009688'

export default function PrivateContainer() {
	const state = useContext(StateContext)
	const { userType } = state

	const tabBarOptions = {
		style: { height: 80 },
		activeTintColor: ICONS_COLOR_ACTIVE,
		inactiveTintColor: ICONS_COLOR_NOT_ACTIVE,
		labelStyle: { fontSize: 18, fontWeight: 'bold' }
	}

	function getAntDesignIcon(name) {
		return (focused, color, size) => (
			<AntDesign name={name} size={ICONS_SIZE} color={ICONS_COLOR_NOT_ACTIVE} />
		)
	}

	function getFontAwesomeIcon(name) {
		return (focused, color, size) => (
			<FontAwesome
				name={name}
				size={ICONS_SIZE}
				color={ICONS_COLOR_NOT_ACTIVE}
			/>
		)
	}

	function getCorrectContainerOnUser() {
		switch (userType) {
			case 'TRABALHADOR':
				const TrabalhadorTab = createBottomTabNavigator()
				return (
					<TrabalhadorTab.Navigator
						initialRouteName="Profile"
						tabBarOptions={tabBarOptions}
					>
						<TrabalhadorTab.Screen
							name="Profile"
							component={TrabalhadorProfile}
							options={{
								tabBarIcon: getAntDesignIcon('profile')
							}}
						/>
						<TrabalhadorTab.Screen
							name="Feed"
							component={TrabalhadorFeed}
							options={{
								tabBarIcon: getFontAwesomeIcon('feed')
							}}
						/>
					</TrabalhadorTab.Navigator>
				)
			case 'EMPRESA':
				const EmpresaTab = createBottomTabNavigator()
				return (
					<EmpresaTab.Navigator
						initialRouteName="Perfil"
						tabBarOptions={tabBarOptions}
					>
						<EmpresaTab.Screen
							name="Perfil"
							component={EmpresaProfile}
							options={{
								tabBarIcon: getAntDesignIcon('profile')
							}}
						/>
						<EmpresaTab.Screen
							name="Nova Vaga"
							component={EmpresaProfile}
							options={{
								tabBarIcon: getAntDesignIcon('pluscircleo')
							}}
						/>
						<EmpresaTab.Screen
							name="Minhas Vagas"
							component={EmpresaProfile}
							options={{
								tabBarIcon: getFontAwesomeIcon('feed')
							}}
						/>
					</EmpresaTab.Navigator>
				)
		}
	}

	return getCorrectContainerOnUser()
}

const styles = StyleSheet.create({
	tabContainer: {
		height: 100
	}
})
