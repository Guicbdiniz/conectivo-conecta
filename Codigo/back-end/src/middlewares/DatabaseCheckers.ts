import { Request, Response, NextFunction } from 'express'
import sql from '../db'

/**
 * Middleware to check if table 'trabalhador' exists.
 *
 * If the table does not exist, it will create it.
 */
export function checkTrabalhador(
	req: Request,
	res: Response,
	next: NextFunction
) {
	sql.query(
		`CREATE TABLE IF NOT EXISTS \`trabalhador\` (
        \`cpf\` VARCHAR(12) NOT NULL,
        \`nomeCompleto\` VARCHAR(45) NULL,
        \`nomeCompletoPai\` VARCHAR(45) NULL,
        \`nomeCompletoMae\` VARCHAR(45) NULL,
        \`numeroDeRG\` INT NULL DEFAULT 0,
        \`dataDeNascimento\` VARCHAR(45) NULL,
        \`localDeNascimento\` VARCHAR(30) NULL,
        \`estadoCivil\` VARCHAR(20) NULL,
        \`numeroDeFilhos\` INT NULL,
        \`telefoneDeContato\` VARCHAR(13) NULL,
        \`email\` VARCHAR(30) NULL,
        \`endereco\` VARCHAR(60) NULL,
        \`escolaridade\` VARCHAR(30) NULL,
        \`objetivoProfissional\` LONGTEXT NULL,
        \`resumoProfissional\` LONGTEXT NULL,
        \`senha\` VARCHAR(60) NULL,
        PRIMARY KEY (\`cpf\`),
        UNIQUE INDEX \`CPF_UNIQUE\` (\`cpf\` ASC) VISIBLE);`,
		function (err, dbRes) {
			if (err) {
				console.log('DB error!\n', err)
				res.status(500).json({
					message: `Error: ${err}`
				})
				return
			}

			next()
		}
	)
}

/**
 * Middleware to check if table 'experienciaProfissional' exists.
 *
 * If the table does not exist, it will create it.
 */
export function checkExperienciaProfissional(
	req: Request,
	res: Response,
	next: NextFunction
) {
	sql.query(
		`CREATE TABLE IF NOT EXISTS \`experienciaprofissional\` (
            \`id\` INT NOT NULL AUTO_INCREMENT,
            \`cargo\` VARCHAR(45) NULL,
            \`local\` VARCHAR(45) NULL,
            \`trabalhador\` VARCHAR(12) NULL,
            PRIMARY KEY (\`id\`),
            UNIQUE INDEX \`id_UNIQUE\` (\`id\` ASC) VISIBLE,
            INDEX \`fk_experienciaProfissional_trabalhador_idx\` (\`trabalhador\` ASC) VISIBLE,
            CONSTRAINT \`fk_experienciaProfissional_trabalhador\`
              FOREIGN KEY (\`trabalhador\`)
              REFERENCES \`trabalhador\` (\`cpf\`)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION)
          COMMENT = ' ';`,
		function (err, dbRes) {
			if (err) {
				console.log('DB error!\n', err)
				res.status(500).json({
					message: `Error: ${err}`
				})
				return
			}

			next()
		}
	)
}
