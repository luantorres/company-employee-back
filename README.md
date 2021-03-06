[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


## Descri????o

"Empresas/Funcion??rios Back-End" ?? uma API desenvolvida em TypeScript, com o framework [Nest](https://github.com/nestjs/nest). Os dados s??o persistidos em um banco de dados [MongoDB](https://www.mongodb.com/).

## Instala????o

Instalando as depend??ncias
```bash
npm install
```

## Rodando o app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

O servidor iniciar?? por padr??o na porta:8080 - acesse: <http://localhost:8080>

## Endpoints Empresa

### GET all `/api/companies`

### GET one `/api/companies/:companyId`

### POST `/api/companies/:companyId`
```bash
{
	"name": "",
	"phone": "(16)9999-9999",
	"address": {
		"zipCode": "00000-000",
        "number": 0
	}
}
```

### PUT
```bash
{
	"phone": "(16)99999-9999",
	"address": {
		"zipCode": "00000-000",
        "number": 0
	}
}
```

### DELETE de uma empresa `/api/companies/:companyId`

## Endpoints Funcion??rios

### GET all `/api/companies/:companyId/employees`

### GET one `/api/companies/:companyId/employees/:employeeId`

### POST `/api/companies/:companyId/employees`
```json
{
	"name": "",
	"salary": 0,
	"role": ""
}
```

### PUT `/api/companies/:companyId/employees/:employeeId`
```json
{
	"phone": "(16)99999-9999",
	"address": {
		"zipCode": "00000-000",
        "number": 0
	}
}
```

### DELETE `/api/companies/employees/:employeeId`

## License
[MIT](https://choosealicense.com/licenses/mit/)
