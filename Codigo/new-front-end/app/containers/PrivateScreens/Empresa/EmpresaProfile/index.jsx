import React, { useContext, useEffect, useState } from 'react'
import { getEmpresa } from '../../../../API/EmpresaAPI'
import { DispatchContext, StateContext } from '../../../../contexts'
import ValidatedProfile from './ValidatedProfile'
import NotValidatedProfile from './NotValidatedProfile'
import { StyleSheet } from 'react-native'

export default function EmpresaProfile({}) {
	const [beingEdited, setBeingEdited] = useState(false)
	const dispatch = useContext(DispatchContext)
	const state = useContext(StateContext)
	const { userData: empresa } = state

	return empresa.eValido ? <ValidatedProfile /> : <NotValidatedProfile />
}
