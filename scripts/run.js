var server = require('pushstate-server');
var chalk = require('chalk');

console.log('  ' + chalk.cyan('Starting...'));
console.log('  ' + chalk.cyan('Starting PushState-Server') + '... Port: 3000');

server.start({
	port:3000,
	directory:"./build"
})