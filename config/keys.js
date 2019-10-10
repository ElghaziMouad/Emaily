if (process.env.NODE_ENV === 'production'){
	console.log('proooduction', process.env.Node_ENV);
	module.export = require('./prod');
} else {
	console.log('devvvv')
	module.export = require('./dev');
}