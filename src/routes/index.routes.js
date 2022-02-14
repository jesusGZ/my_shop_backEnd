const glob = require('glob');
const path = require('path');

module.exports = (app) => {
	glob.sync('./src/routes/*.*.js').forEach((file) => {
		if (!file.includes('index.routes.js')) require(path.resolve(file))(app);
	});
};
