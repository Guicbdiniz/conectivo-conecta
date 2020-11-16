import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { StateContext } from '../../contexts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TrabalhadorProfile from './Trabalhador/TrabalhadorProfile'
import TrabalhadorFeed from './Trabalhador/TrabalhadorFeed'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import EmpresaProfile from './Empresa/EmpresaProfile'
import EmpresaNewJob from './Empresa/EmpresaNewJob'
import EmpresaFeed from './Empresa/EmpresaFeed'

const ICONS_SIZE = 30
const ICONS_COLOR_NOT_ACTIVE = 'black'
const ICONS_COLOR_ACTIVE = '#009688'

export default function PrivateContainer() {
	const state = useContext(StateContext)
	const { userType } = state

	const tabBarOptions = {
		style: { height: 60 },
		activeTintColor: ICONS_COLOR_ACTIVE,
		inactiveTintColor: ICONS_COLOR_NOT_ACTIVE,
		labelStyle: { fontSize: 14, fontWeight: 'bold' }
	}

	function getAntDesignIcon(name) {
		return ({ focused, color, size }) => (
			<AntDesign name={name} size={ICONS_SIZE} color={color} />
		)
	}

	function getFontAwesomeIcon(name) {
		return ({ focused, color }) => (
			<FontAwesome name={name} size={ICONS_SIZE} color={color} />
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
						initialRouteName="Minhas Vagas"
						tabBarOptions={tabBarOptions}
						lazy={false}
					>
						<EmpresaTab.Screen
							name="Minhas Vagas"
							component={EmpresaFeed}
							options={{
								tabBarIcon: getFontAwesomeIcon('feed')
							}}
						/>
						<EmpresaTab.Screen
							name="Nova Vaga"
							component={EmpresaNewJob}
							options={{
								tabBarIcon: getAntDesignIcon('pluscircleo')
							}}
						/>
						<EmpresaTab.Screen
							name="Perfil"
							component={EmpresaProfile}
							options={{
								tabBarIcon: getAntDesignIcon('profile')
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
		height: 80
	}
})
