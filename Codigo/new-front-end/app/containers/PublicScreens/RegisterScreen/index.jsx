import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import RegisterEmpresaForm from './RegisterEmpresaForm'
import RegisterTrabalhadorForm from './RegisterTrabalhadorForm'
import SelectAccoutTypeForm from './SelectAccoutTypeForm'

export default function RegisterScreen({ navigation }) {
	const [accoutType, setAccoutType] = useState('')

	function getRegisterFormWithCorrectType() {
		switch (accoutType) {
			case '':
				return <SelectAccoutTypeForm setAccoutType={setAccoutType} />
			case 'TRABALHADOR':
				return <RegisterTrabalhadorForm />
			case 'EMPRESA':
				return <RegisterEmpresaForm />
		}
	}

	return getRegisterFormWithCorrectType()
}
