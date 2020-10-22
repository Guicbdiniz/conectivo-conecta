import React, { useState, useReducer } from 'react'
import PublicContainer from './app/containers/PublicScreens'
import PrivateContainer from './app/containers/PrivateScreens'
import { NavigationContainer } from '@react-navigation/native'
import { initialState, reducer } from './app/reducer'
import { DispatchContext, StateContext } from './app/contexts'

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState)

	const { userIsLoggedIn } = state

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>
				<NavigationContainer>
					{userIsLoggedIn ? <PrivateContainer /> : <PublicContainer />}
				</NavigationContainer>
			</StateContext.Provider>
		</DispatchContext.Provider>
	)
}
