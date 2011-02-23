var http = require('http'),
		sys = require('sys'),
		fs = require('fs'),
		url = require('url'),
		get = require('node-get'),
//	K = require('kissy'),
    read = require('../lib/readability.js');

var style = '#main{width:950px;margin:0 auto;}center{font-size:40px;color:red;}#search{width:950px;text-align:center;margin:0 auto;}blockquote{margin:0;padding:10px;line-height:40px;}blockquote:before{float:left;content:"“";font-size:60px;color:#999;line-height:40px;}pre{background:#FFF;color:#333;font-size:18px;border-left:1px #333 solid;padding-left:10px;line-height:1.5;}';

var Curler = {
	start: function(link, res){
			var dl = new get(link);
			dl.asString(function(){
				var aa = arguments[1];
				read.parse(aa,'',function(result) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write('<!DOCTYPE html><html><head><meta charset="utf-8" /><title>'+ result.title +'</title><style type="text/css">' + style  + '</style></head><body>');
					res.write('<div id="main"><center>Node-Readability</center>');
					res.write('<div id="search"><form method="get" action="#"><p><input type="text" name="url" /><input type="submit" value="Readable" /></p></form></div>');					
  				res.write(result.content,'utf8');
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
		res.write('<!DOCTYPE html><html><head><meta charset="utf-8" /><title>'+ 'Node-Readability' +'</title><style type="text/css">' + style  + '</style></head><body>');
		res.write('<div id="main"><center>Node-Readability</center>');
  	res.write('<div id="search"><form method="get" action="#"><p><input type="text" name="url" /><input type="submit" value="Readable" /></p></form></div>');
		res.write('</div>');
		res.write('</body></html>');
		res.end();
	}
}

//Curler.start('http://www.zipeng.info/archives/plan-of-2011.html');

//Start My Server
//server is used to GET the data
var server = http.createServer(function (req, res) {
	//加入静态文件的服务
	res.on('data', function() {
		console.log(1);
	});
	
	
	//if ((req.url).indexOf('.css') !== 0) {
	//	res.writeHead(200, {'Content-Type': 'text/html'});
	//}
	//var aa =	url.parse(req.url, true);
	
	var searchUrl = url.parse(req.url, true);
	
	//console.log(searchUrl);
	if (searchUrl.query && searchUrl.query.url) {
		Curler.start(searchUrl.query.url,res);
	}	else {
		Form.show(res);
	}	
	//console.log(req);
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Hello World\n');
}).listen(8122, "127.0.0.1");

/*
 * TODO 做一个用户填写的默认界面，并能够获取到表单的数据
 * 
 */


