/**
 * App global initial state.
 */
export const initialState = {
	userIsLoggedIn: false,
	userType: 'NONE',
	userEmail: '',
	authToken: ''
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
			const { userType, userEmail, authToken } = action

			return {
				...state,
				userIsLoggedIn: true,
				userType: userType,
				userEmail: userEmail,
				authToken: authToken
			}

		case 'logOut':
			return {
				...state,
				userIsLoggedIn: false,
				userType: UserLoggedTypes.NONE,
				userEmail: '',
				authToken: ''
			}
	}
}
