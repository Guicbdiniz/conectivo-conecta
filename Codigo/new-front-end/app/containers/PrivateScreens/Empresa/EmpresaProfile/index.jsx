import React, { useContext, useEffect, useState } from 'react'
import { getEmpresa } from '../../../../API/EmpresaAPI'
import { StateContext } from '../../../../contexts'
import ValidatedProfile from './ValidatedProfile'
import NotValidatedProfile from './NotValidatedProfile'
import { StyleSheet } from 'react-native'

export default function EmpresaProfile({}) {
	const [beingEdited, setBeingEdited] = useState(false)
	const state = useContext(StateContext)
	const { userData: empresa } = state

	return empresa.eValido ? <ValidatedProfile /> : <NotValidatedProfile />
}
