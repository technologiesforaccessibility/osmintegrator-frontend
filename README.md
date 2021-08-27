# React Application for OSM Integrator

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
Recommended node version: `14.17.5`  
Recommended npm version: `6.14.14`

Clone branch `main` from this repository  
Run `npm i` for installing dependencies  
In `package.json` find line which relates to proxy `"proxy": "https://localhost:9999"` - keep `9999` if you run development on Linux, replace with `44388` otherwise   
**[EDIT]** Use `http://localhost:9998` for development purpose

Clone and run [Backend repository](https://github.com/technologiesforaccessibility/osmintegrator-backend)
Run app by `npm run start`

## Swagger api synchro
Frontend uses api generated with `swagger-typescript-api`
To be sure the latest api version is being used:
 1. Run `GET` method on `/swagger/v1/swagger.json` endpoint (make sure you use latest backend version)
 2. Copy api response body to `src/api/openapi.json`
 3. Run `npm run build:api` and generate latest api


## Wiki
If you want to find out more about project, see [our wiki](https://github.com/technologiesforaccessibility/osmintegrator-wiki)


## Contributing
If you want to contribute, open and issue or contact directly any contributor who has been contributing to this repository recently.
