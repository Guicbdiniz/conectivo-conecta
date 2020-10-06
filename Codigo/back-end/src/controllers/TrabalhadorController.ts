import {Request, Response} from 'express'
import {
    insert,
    insertUsuario,
    selectAllTrabalhadores,
    selectByEmail,
    selectUserByEmail,
    removeTrabalhador,
} from '../models/TrabalhadorModel'
import {Trabalhador, Usuario} from '../types/TrabalhadorTypes'
import bcrypt from 'bcrypt'
import {
    createBodyIsValid,
    loginBodyIsValid,
} from '../validators/TrabalhadorValidators'
import jwt from 'jsonwebtoken'

/**
 * Create worker Controller.
 *
 * The request body must contain all the woker's attribute, along with an array with the working experience and a user obejct.
 */
export async function create(req: Request, res: Response) {
    if (createBodyIsValid(req.body)) {
        res.status(400).json({
            message: 'Error: Incorrect request body.',
        })
        return
    }

    const newUsuario: Usuario = {...req.body.usuario}
    const newTrabalhador: Trabalhador = {...req.body.trabalhador}

    const hashedPassword = await bcrypt.hash(newUsuario.senha, 10)
    newUsuario.senha = hashedPassword

    try {
        await insertUsuario(newUsuario)

        await insert(newTrabalhador, newUsuario.email)

        res.status(200).json({
            message: 'Trabalhador created!',
            trabalhador: newTrabalhador,
            usuario: newUsuario,
        })
    } catch (err) {
        res.status(500).json({
            message: `Error: ${err}`,
        })
    }
}

/**
 * Call multiple insertions of ExperienciasProfissionais, returning any errors.
 *
 * DEPRECATED
 */
// async function createMultipleExperienciasProfissionais(
// 	experienciasProfissionais: ExperienciaProfissional[],
// 	cpf: Number
// ) {
// 	try {
// 		for (const experiencia of experienciasProfissionais) {
// 			await insertExperienciaProfissional(experiencia, cpf)
// 		}
// 	} catch (err) {
// 		throw new Error(err)
// 	}
// }

/**
 * Login controller.
 *
 * After validation, a valid JWT is returned.
 */
export async function login(req: Request, res: Response) {
    if (!loginBodyIsValid(req.body)) {
        res.status(400).json({
            message: 'Error: request body is invalid!',
        })
        return
    }

    const {email, senha} = req.body

    try {
        const selectedTrabalhador = (await selectByEmail(email)) as Trabalhador
        const selectedUsuario = (await selectUserByEmail(email)) as Usuario

        // Password check
        if (await bcrypt.compare(senha, selectedUsuario.senha.toString())) {
            const secretJWTKey = process.env.ACCESS_TOKEN_SECRET

            if (secretJWTKey === undefined) {
                throw new Error('Secret JWT key was not defined')
            }

            const accessToken = jwt.sign(
                selectedTrabalhador,
                secretJWTKey as string
            )

            res.status(200).json({
                message: 'User authenticated with success',
                token: accessToken,
            })
        } else {
            res.status(400).json({
                message: 'Error: invalid password.',
            })
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error: ' + err,
        })
    }
}

/**
 * Get Trabalhador Controller.
 *
 */
export async function getTrabalhador(req: Request, res: Response) {
    const {email} = req.params

    console.log('Email: ' + email)

    try {
        const trabalhador = (await selectByEmail(email)) as Trabalhador
        const usuario = (await selectUserByEmail(email)) as Usuario

        res.status(200).json({
            message: 'Trabalhador getted!',
            trabalhador: trabalhador,
            usuario: usuario,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error: ' + err,
        })
    }
}

export async function deleteTrabalhador(req: Request, res: Response) {
    const {email} = req.params

    console.log('Email: ' + email)

    try {
        const usuario: Usuario = {...req.body.usuario}

        await removeTrabalhador(usuario)

        res.status(200).json({
            message: 'Trabalhador deleted!',
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error: ' + err,
        })
    }
}

export async function getAllTrabalhadores(req: Request, res: Response) {
    try {
        const allTrabalhadores = (await selectAllTrabalhadores()) as Trabalhador[]

        res.status(200).json({
            message: 'Trabalhadores getted!',
            trabalhadores: allTrabalhadores,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error: ' + err,
        })
    }
}
