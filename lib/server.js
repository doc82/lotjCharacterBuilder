/**
 *
 * Project: Legends of the Jedi Character-Website-Thingy
 * Created by: Veska AKA Bruce Bjorklund
 * Date: 9/6/12
 * insert copyright stuff here
 */

// for reference: https://github.com/gradus/flatiron-example
// Server Modules
var flatiron 	= require('flatiron'),
	path 				= require('path'),
	union 			= require('union'),
	plates 			= require('plates'),
	fs 					= require('fs'),
	ecstatic 		= require('ecstatic'),
	app 				= flatiron.app;

Views = require('./views');

// Server config settings
app.config.file({ file: path.join(__dirname, 'config', 'config.json') });
//////////////////////
// HTTP Server
app.use(flatiron.plugins.http,
	 {
	// 404 error handle.. noobs.. noobs everywhere!
	onError: function (err)
		{
		this.res.writeHead(err.status || 404,
			{ 'Content-Type': 'text/html' });

			this.res.end(Views.onError);
		}
	});

// Have sockets listen to server
var io = require('socket.io').listen(app);

//############### static file server, and URL-routing  ##########################
//	static file server - super basic... Need to add compression and header optimizations
app.http.before =
	[
	ecstatic(__dirname + '/../assets', { autoIndex : false, cache : 3600})
	];

////////////////////////////////
// Entry Point
app.router.get('/', function ()
	{
	// Shortcut to response-request objects
	var req = this.req,
			res = this.res;

	res.writeHead(200, {'content-type': 'text/html'});
	res.end(Views.index);
	});

app.router.get('/about', function ()
	{
	// Shortcut to response-request objects
	var req = this.req,
		res = this.res;

	res.writeHead(200, {'content-type': 'text/html'});
	res.end(Views.about);
	});

//######################## END FILE SERVER ##############################


// Socket IO message handling. All message traffic for the entire server goes through this part of the server. It's probably going to be the bottleneck. Yay.
var connections;
var clients = {};
io.set('log level', 1); // reduce logging
io.sockets.on('connection', function(socket)
	{
	connections++;

	socket.on('disconnect', function() // Disconnect Logic
	{
	if (clients[socket.id]) // if the client exists in the 'authorized' list, then remove them
		{
		var tmpUser = clients[socket.id];
		console.log("Authorized user: "+ socket.id + "  Disconnected");
		return;
		}
	console.log("Un-authorized user: " + socket.id + " disconnected");
	connections--;
	});

});

/////////////////////////////
// initialize stuff
app.start(app.config.get('port') || 8080, function (err)
	{
	if (err)
		{
		app.log.info("Server failed to deploy!" + err);
		throw err;
		}

	var address = app.server.address();
	app.log.info ("Listening on http://" + address.address + ':' + address.port);
	});


