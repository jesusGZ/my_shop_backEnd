const METHODS = ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'];

module.exports = function methodsHttp(req, res, next) {
	res.header('Access-Control-Allow-Headers', `Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method`);
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('access-control-expose-headers', 'token');
	res.header('Access-Control-Allow-Origin', '*');

	if (req.method) {
		let valid_method = undefined;
		valid_method = METHODS.find((method) => method == req.method);

		if (valid_method == undefined) {
			const object = { response: { status: 'error', data: 'Metodo de peticion no valido' }, status: 405 };
			res.send(object);
		} else {
			next();
		}
	}
};
