/**
 *
 * Project: Legends of the Jedi Character-Website-Thingy
 * Created by: Veska AKA Bruce Bjorklund
 * Date: 9/6/12
 * insert copyright stuff here
 */

 var Views = module.exports;
 var fs = require('fs');

 Views.viewsDir = __dirname + '/../views';

 Views.index = '';
 Views.onError = '';
 Views.about = '';

 indexPage = fs.readFile(Views.viewsDir + '/index.html', 'utf8', function (err, data)
 		{
 		if (err)
 			throw err;
 		else
			Views.index += data;
 		});

onErrorPage = fs.readFile(Views.viewsDir + '/404.html', 'utf8', function (err, data)
	{
	if (err)
		throw err;
	else
		Views.onError += data;
	});

about = fs.readFile(Views.viewsDir + '/about.html', 'utf8', function (err, data)
	{
	if (err)
		throw err;
	else
		Views.about += data;
	});



