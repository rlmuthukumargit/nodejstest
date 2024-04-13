const express = require("express");
const helmet = require("helmet");
const swaggerUi = require('swagger-ui-express');

const app = express();
app.enable("trust proxy");

app.use(helmet());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 	res.setHeader("Access-Control-Allow-Headers", "*");
    //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(require('morgan')('dev', {
	skip: function (req, res) { return res.statusCode < 400; }
}));
const args = process.argv.slice(2)[0];
const AWS = require('aws-sdk');
const region = "ap-south-1";

let client = new AWS.SecretsManager({
	region: region
});
 
	if (args == undefined) {
		console.log("Error : Please provide environment");
	} else {

		process.env.CONFIG_ARG = args;
		require("dotenv").config();
		let CONFIG = require('./src/configs/config')(args)

		if (['PREPROD', 'PROD'].indexOf(args) > -1) {  
			console.log(" IFFFFFF "); 
			client.getSecretValue({ SecretId: CONFIG.SECRET_KEY }, function (err, data) {
				if (err) {
					console.log("Error", err);
					throw err;
				}
				else { 
					if ('SecretString' in data) { 
						let connectionUrl = JSON.parse(data.SecretString)
						console.log("Secrret connectionUrl port ", connectionUrl.port); 
						process.env.MONGO_URL = `mongodb://${connectionUrl.username}:${connectionUrl.password}@${connectionUrl.host}:${connectionUrl.port}/${CONFIG.DB_NAME}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
 
						const swaggerDocument = require('./docs/swagger.json');
						const { handler } = require('./src/middleware/errorHandler');
						// middle wares section
						const { CustomLogger } = require("./src/middleware/logger");
						let appLogger = new CustomLogger();
						app.use(appLogger.requestDetails(appLogger));
						const routers = require("./src/routes");
						routers(app);
						app.use(handler);
						const opts = {
							explorer: false,
							swaggerOptions: {
								validatorUrl: null
							},
							customSiteTitle: 'tbd-user-ms - Backend REST Service',
							customfavIcon: 'https://www.localhost.com/favicon/16x16.png'
						};  
						app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, opts));

						app.get('/', (req, res) => {
							res.status(200).json({
								status: "success",
								message:"tbd-user-ms backend service running..."
							})
						}); 
						// create the connection to database
						const port = process.env.PORT || 2203;
						app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

					}
				}
			}); 

		} else {
			console.log("In else")
			const swaggerDocument = require('./docs/swagger.json');
			const { handler } = require('./src/middleware/errorHandler');
			// middle wares section
			const { CustomLogger } = require("./src/middleware/logger");
			let appLogger = new CustomLogger();
			app.use(appLogger.requestDetails(appLogger));
			const routers = require("./src/routes");
			//chromium.install()
			routers(app);
			app.use(handler);
			const opts = {
				explorer: false,
				swaggerOptions: {
					validatorUrl: null
				},
				customSiteTitle: 'Mytask-user-ms - Backend REST Service',
				customfavIcon: 'https://www.localhost.com/favicon/16x16.png'
			};

			app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, opts)); 
			app.get('/', (req, res, next) => {
				res.status(200).json({
					status: 1,
					message: "Mytask-user-ms App Running Successfully"
				})
			})

			const port = process.env.PORT
			app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
		}

	process.on('uncaughtException', function (err) {
		console.log('whoops! There was an uncaught error', err);
	});

	process.on('unhandledRejection', function (reason, promise) {
		console.log('Unhandled rejection', { reason: reason, promise: promise });
	});

	}  
 

