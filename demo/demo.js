var http = require('http'),
		sys = require('sys'),
		fs = require('fs'),
		url = require('url'),
		ejs = require('ejs'),
		get = require('node-get'),
    read = require('../lib/readability');

var tempstr = fs.readFileSync('./temp.html', 'utf8');

var Curler = {
	start: function(link, res){
			var dl = new get(link);

			dl.asString(function(){
				var arg1 = arguments[1];
				if(!arg1) {
					Form.show(res);
					return;
				}
				read.parse(arg1, '', function(result) {
					result = {
						locals:{
							'title':result.title,
							'content':result.content
							}
					};
					var html = ejs.render(tempstr, result);
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(html);
  				res.write(result.locals.content,'utf8');
					res.write('</div>');
					res.write('</body></html>');
					res.end();
				});
			});
	}
};

var Form = {
	show: function(res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		var result = {
			locals:{
				'title':'Node-Readability'
			}
		};
		var html = ejs.render(tempstr, result);
		res.write(html);
		res.write('</div>');
		res.write('</body></html>');
		res.end();
	}
}

//Curler.start('http://www.zipeng.info/archives/plan-of-2011.html');

//Start My Server
//server is used to GET the data
var server = http.createServer(function (req, res) {
	//console.log(req);
	
	//加入静态文件的服务
	//process.on('data',function(chunk) {
	//	console.log(chunk);
	//});
	
	//if ((req.url).indexOf('.css') !== 0) {
	//	res.writeHead(200, {'Content-Type': 'text/html'});
	//}
	
	var searchUrl = url.parse(req.url, true);
	if (searchUrl.query && searchUrl.query.url) {
		var checkUrl = url.parse(searchUrl.query.url);
	} else {
		checkUrl = {};//赋值空对像
	}
	
	//console.log(checkUrl);
	if (checkUrl.protocol && checkUrl.host && checkUrl.protocol=='http:' && checkUrl.host) {
		Curler.start(searchUrl.query.url, res);
	}	else {
		Form.show(res);
	}
}).listen(8080, "127.0.0.1");

/*
 * TODO 
 * 1、做一个用户填写的默认界面，并能够获取到表单的数据[finished]
 * 2、重写一套样子
 * 3、动态的变化输出的编码。
 * 4、把静态文件的服务写出来，目前的style太囧了
 * 5、处理输入的问题，错误的输入容易导致服务器挂掉
 * 6、加入了ejs模板，把html独立出去
 */


