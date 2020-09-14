# Código do Projeto

O projeto é dividido em backend e frontend, localizados em suas devidas pastas atualmente utiliza como serviços externos o banco MySQL.

# Docker e Docker-compose

## Como usar:

Para utilizar primeiro instale docker no seu sistema

Após instalação avegue até a pasta onde se localiza o arquivo docker-compose.yml
`cd plf-es-2020-2-tiiv-8499100-conectivo/Codigo`

Para iniciar os serviços, digite o comando:
`docker-compose up`

Isso inicializará 3 serviços, sendo eles bando de dados (mysql), backend e frontend. Estes poderão ser encontrados em:
* Mysql: localhost:3306
* Backend: http://localhost:8000
* Frontend: http://localhost:? (ainda nao definido)*

### Dados padrões para desenvolvimento local:
MYSQL_DATABASE: conectivo_conecta_db
MYSQL_ROOT_PASSWORD: 637423
