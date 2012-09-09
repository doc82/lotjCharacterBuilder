/* Author:

*/



$('a[data-toggle="tab"]').on('show', function (e) {
e.target // activated tab
e.relatedTarget // previous tab
});

var socket = socket = io.connect('localhost');
////////////////////////
// Socket.IO Logic
function socketConfigure()
	{
	socket.on('connect', function ()
		{
		debugger;
		});
	socket.on('reconnect', function ()
		{

		});
	socket.on('reconnecting', function (nextRetry)
		{

		});
	socket.on('reconnect_failed', function ()
		{

		});
	registerMessage("Login");
	}

function registerMessage(message)
	{
	socket.emit('register', message);
	}

socketConfigure();

