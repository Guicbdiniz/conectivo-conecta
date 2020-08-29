import { Request, Response } from 'express'

export const getView = (req: Request, res: Response) => {
	res.json({
		message: 'HelloWorld!'
	})
}
