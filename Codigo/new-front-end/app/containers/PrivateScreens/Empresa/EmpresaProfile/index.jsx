import React, { useContext, useEffect, useState } from 'react'
import { getEmpresa } from '../../../../API/EmpresaAPI'
import { DispatchContext, StateContext } from '../../../../contexts'
import ValidatedProfile from './ValidatedProfile'
import NotValidatedProfile from './NotValidatedProfile'
import { StyleSheet } from 'react-native'

export default function EmpresaProfile({}) {
	const [beingEdited, setBeingEdited] = useState(false)
	const [empresa, setEmpresa] = useState({
		cnpj: '',
		email: '',
		razaoSocial: '',
		site: '',
		telefoneDeContato: '',
		caminhoParaImagem: '',
		eValido: true
	})
	const dispatch = useContext(DispatchContext)
	const state = useContext(StateContext)

	useEffect(() => {
		getEmpresa(state.userEmail, state.authToken)
			.then((empresa) => {
				setEmpresa(empresa), console.log('Empresa getted:', empresa)
			})
			.catch((err) => {
				Alert.alert(
					'Erro',
					'Houve um erro de conexão ao buscar os dados do seu perfil',
					[{ text: 'Ok' }]
				)
			})
	}, [])

	return empresa.eValido ? (
		<ValidatedProfile empresa={empresa} setEmpresa={setEmpresa} />
	) : (
		<NotValidatedProfile empresa={empresa} />
	)
}