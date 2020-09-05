import { Request, Response } from 'express'
import { createTrabalhador } from '../models/TrabalhadorModel'
import { Trabalhador } from '../types'
import bcrypt from 'bcrypt'
import { PassThrough } from 'stream'
import { isBuffer } from 'util'

export async function create(req: Request, res: Response) {
	try {
		const {
			cpf,
			senha,
			nomeCompleto,
			nomeCompletoPai,
			nomeCompletoMae,
			numeroDeRG,
			dataDeNascimento,
			localDeNascimento,
			estadoCivil,
			temFilhos,
			telefoneDeContato,
			email,
			endereco,
			escolaridade,
			experienciasProfissionais,
			objetivoProfissional,
			resumoProfissional
		} = req.body

		const hashedPassword = await bcrypt.hash(senha, 10)

		const newTrabalhador: Trabalhador = {
			cpf: parseInt(cpf),
			senha: hashedPassword,
			nomeCompleto: nomeCompleto,
			nomeCompletoPai: nomeCompletoPai,
			nomeCompletoMae: nomeCompletoMae,
			numeroDeRG: parseInt(numeroDeRG),
			dataDeNascimento: dataDeNascimento,
			localDeNascimento: localDeNascimento,
			estadoCivil: estadoCivil,
			temFilhos: temFilhos === 'true',
			telefoneDeContato: telefoneDeContato,
			email: email,
			endereco: endereco,
			escolaridade: escolaridade,
			experienciasProfissionais: experienciasProfissionais,
			objetivoProfissional: objetivoProfissional,
			resumoProfissional: resumoProfissional
		}

		createTrabalhador(newTrabalhador, function (err: any, data: any) {
			if (err) {
				res.status(500).send({
					message: err
				})
			} else {
				res.send(data)
			}
		})
	} catch (err) {
		res.status(500).send({
			message: err
		})
	}
}
