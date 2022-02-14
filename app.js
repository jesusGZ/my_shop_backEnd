const express = require('express');
const morgan = require('morgan');
const swagger_ui = require('swagger-ui-express');
const compression = require('compression');
const cors = require('cors');

const { SERVICE } = require('./src/core/config/index');
const DB = require('./src/core/db/connection');
const swagger_doc = require('./Docs');

const https = require('https');
const http = require('http');
const app = express();

DB.getConnection().catch((err) => {
	console.error('[Error db]: ' + err);
});

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.json({ limit: '500kb', extended: true }));
app.use(express.urlencoded({ limit: '500kb', extended: true }));
app.use('/document-apis', swagger_ui.serve, swagger_ui.setup(swagger_doc));

require('./src/routes/index.routes')(app);
require('./src/routes/default/index.routes')(app);

http.createServer(/* options, */ app).listen(SERVICE.LOCAL_PORT, () => {
	console.log('[HTTP] El servidor esta escuchando en el puerto: ' + SERVICE.LOCAL_PORT + '...');
});
