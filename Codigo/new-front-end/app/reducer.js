/**
 * App global initial state.
 */
export const initialState = {
	userIsLoggedIn: false,
	userType: 'NONE',
	userEmail: '',
	authToken: '',
	userData: {},
	vagasData: []
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
			let { userType, userEmail, authToken, userData, vagasData } = action

			return {
				...state,
				userIsLoggedIn: true,
				userType: userType,
				userEmail: userEmail,
				authToken: authToken,
				userData: userData,
				vagasData: vagasData
			}

		case 'logOut':
			return {
				...state,
				userIsLoggedIn: false,
				userType: UserLoggedTypes.NONE,
				userEmail: '',
				authToken: '',
				userData: {}
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
	}
}
