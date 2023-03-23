<hr/>
<br/>
<div align="center"> <i>Currency converter<i></div>
<br/>
<hr/>

# Architecture

![back-end-arch](src/main/docs/images/back-end-arch.png)

<hr/>

## Main libraries used:

- axios
- dotenv
- express
- pg
- pg-hstore
- sequelize
- swagger-ui-express
- winston
- umzug
- jest

## Dependencies to run the project:

- Docker
- Node

<hr/>

# How to run?

## - In the root of the project use the "yarn" command to install the node_modules dependencies

<br/>

## - Run the command "docker compose up" inside of the root of the project

<br/>

## - Take the file ".env.example" and remove the ".example" of his name

After change the name of the file, insert values in the .env file

<br/>

## - Choose two coins to be used in this application, first coin is the local coin(LOCAL_CURRENCY) and second(ALTERNATIVE_CURRENCY) is any coin that is accept in this API, here is one list: https://economia.awesomeapi.com.br/xml/available/uniq

<br/>

## - you gonna need to put the migrations/seed up

In order to do this, you need to have the database on (docker compose up), and run in the root of the project the follow command "yarn migration:up" and after this use the command "yarn seed:up"

<br/>

## - Now you have to decide if you gonna runner the application in the dev environment or production environment, if is dev so use the command "yarn dev", if is production use "yarn start"

<br/>

<hr/>

# Migrations/Seeds

This project uses sequelize as its ORM and sequelize's migration tool called Umzug. Before running any migration/seeder, you must set up DB environment variables accordingly with '.env.example'. If you need to run locally, you can use the command "yarn migration:local:up" otherwise use the command "yarn migration:up". If you need to rollback use "down" instead of "up" in this commands. support documentation for the Umzug library: https://github.com/sequelize/umzug
<br/>

<hr/>

## Logs

The logs of this application is in the src/logs path

<hr/>
<br/>

# Endpoints in the swagger

In the follow endpoint "/api-docs/" you can see the swagger documentation
<br/>
<b>example:</b> http://localhost:3000/api-docs/

## GET - /convert/:currency/:value

### ![back-end-arch](src/main/docs/images/convertEndPoint.png)

<br/>

## POST - /convert/:currency/:value

### ![back-end-arch](src/main/docs/images/saveCurrenciesEndPoint.png)

<br/>

<hr/>
