/**
 * Expection thrown when a trabalhador is not found in a database search.
 */
export class TrabalhadorNotFoundException extends Error {
	public static MESSAGE: string = 'Trabalhador not found'

	constructor() {
		super()

		Object.setPrototypeOf(this, TrabalhadorNotFoundException.prototype)
	}
}
