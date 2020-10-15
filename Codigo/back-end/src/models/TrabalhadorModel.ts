import sql from '../db'
import {
	Trabalhador,
	Conta,
	TrabalhadorChanges
} from '../types/TrabalhadorTypes'

/**
 * Insert a new Trabalhador instance in MySQL database.
 */
export function insert(
	newTrabalhador: Trabalhador,
	email: String
): Promise<Trabalhador> {
	return new Promise(function (resolve, reject) {
		const queryString = `INSERT INTO trabalhador SET ?`

		const workerWithEmail: Trabalhador = { ...newTrabalhador, email: email }

		sql.query(queryString, workerWithEmail, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New trabalhador was created!\n', workerWithEmail)
			resolve(workerWithEmail)
		})
	})
}

/**
 * Insert a new account in MySQL database.
 */
export function insertConta(conta: Conta): Promise<Conta> {
	return new Promise(function (resolve, reject) {
		const queryString = 'INSERT INTO `conta` SET ?'

		sql.query(queryString, conta, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('New Conta was created!', conta)
			resolve(conta)
		})
	})
}

/**
 * Find trabalhador by email and delete it by it's email on trabalhador table.
 */
export function removeTrabalhador(email: String): Promise<String> {
	return new Promise(function (resolve, reject) {
		const trabalhadorQueryString =
			'DELETE FROM `trabalhador` WHERE `email` = ?;'
		const contaQueryString = 'DELETE FROM `conta` "WHERE `email` = ?;'

		sql.query(trabalhadorQueryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Trabalhador deleted!', email)
		})

		sql.query(contaQueryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Conta deleted!', email)
		})
		resolve(email)
	})
}

/**
 * Select all workers from the DB with the passed email.
 */
export function selectByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `trabalhador` WHERE email = ?;'

		sql.query(queryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No Trabalhador was found with the passed email.'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedTrabalhador = Object.values(
				JSON.parse(JSON.stringify(res))
			)[0]

			resolve(returnedTrabalhador)
		})
	})
}

/**
 * Select Account with the passed email.
 */
export function selectAccountByEmail(email: String) {
	return new Promise(function (resolve, reject) {
		const queryString = 'SELECT * FROM `conta` WHERE email = ?;'

		sql.query(queryString, [email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			if (res.length != 1) {
				const errorMsg =
					'Select by email error: No account was found with the passed email.'
				console.log(errorMsg)
				return reject(errorMsg)
			}

			// Data is returned with "RowDataPacket" name. This was the only way I've found to remove it
			const returnedAccount = Object.values(JSON.parse(JSON.stringify(res)))[0]

			resolve(returnedAccount)
		})
	})
}

/**
 * Select all Trabalhadores from the DB.
 */
export function selectAllTrabalhadores() {
	return new Promise(function (resolve, reject) {
		const queryString = `SELECT * FROM trabalhador`

		sql.query(queryString, function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			resolve(res)
		})
	})
}

/**
 * Update a worker with the passed email with the passed changes in the DB.
 */
export function updateTrabalhador(email: string, changes: TrabalhadorChanges) {
	return new Promise(function (resolve, reject) {
		const queryString = 'UPDATE `trabalhador` SET ? WHERE `email` = ?;'

		sql.query(queryString, [changes, email], function (err, res) {
			if (err) {
				console.log('DB error: ', err)
				return reject(err)
			}

			console.log('Trabalhador with email ' + email + ' updated!', changes)
			resolve(email)
		})
	})
}
