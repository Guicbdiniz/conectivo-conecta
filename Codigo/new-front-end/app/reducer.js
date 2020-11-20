/**
 * App global initial state.
 */
export const initialState = {
	userIsLoggedIn: false,
	userType: 'NONE',
	userEmail: '',
	authToken: '',
	userData: {},
	vagasData: [],
	subscribedVagasIds: []
}

/**
 * Object with types of logged users.
 */
export const UserLoggedTypes = {
	NONE: 'NONE',
	TRABALHADOR: 'TRABALHADOR',
	EMPRESA: 'EMPRESA'
}

/**
 * App global reducer.
 */
export function reducer(state, action) {
	switch (action.type) {
		case 'logIn':
			let {
				userType,
				userEmail,
				authToken,
				userData,
				vagasData,
				subscribedVagasIds
			} = action

			return {
				...state,
				userIsLoggedIn: true,
				userType: userType,
				userEmail: userEmail,
				authToken: authToken,
				userData: userData,
				vagasData: vagasData,
				subscribedVagasIds: subscribedVagasIds
			}

		case 'logOut':
			return {
				...state,
				userIsLoggedIn: false,
				userType: UserLoggedTypes.NONE,
				userEmail: '',
				authToken: '',
				userData: {},
				vagasData: [],
				subscribedVagasIds: []
			}

		case 'editUserData':
			userData = action.userData

			return {
				...state,
				userData: userData
			}

		case 'addVaga':
			const vaga = action.vaga

			return {
				...state,
				vagasData: [...state.vagasData, vaga]
			}

		case 'editVagas':
			vagasData = action.vagasData

			return {
				...state,
				vagasData: vagasData
			}

		case 'removeVaga':
			const removedVaga = action.vaga
			let vagas = state.vagasData.filter((vaga) => vaga.id != removedVaga.id)

			return {
				...state,
				vagasData: vagas
			}
		case 'editVaga':
			const vagaEdited = action.vaga
			vagas = state.vagasData.map((vaga) =>
				vaga.id === vagaEdited.id ? vagaEdited : vaga
			)

			return {
				...state,
				vagasData: vagas
			}
		case 'subscribeToVaga':
			const vagaSubscribedId = action.vagaId
			const vagasSubscribedIds = [...state.subscribedVagasIds, vagaSubscribedId]

			return {
				...state,
				subscribedVagasIds: vagasSubscribedIds
			}
	}
}
