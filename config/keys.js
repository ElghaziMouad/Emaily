if (process.env.Node_ENV === 'production'){
	module.export = require('./prod');
} else {
	module.export = require('./dev');
}