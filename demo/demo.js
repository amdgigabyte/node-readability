var http = require('http'),
		sys = require('sys'),
		fs = require('fs'),
		url = require('url'),
		get = require('node-get'),
    read = require('../lib/readability.js');

var style = 'body{background:#EEEEDB;}div{padding:5px 5px 5px 10px;backgroud:#CCC;}#main{margin:0 auto;border:none;}center{font-size:40px;color:#454545;}#search{text-align:center;margin:0 auto;border:none;}#inputurl{width:550px;}blockquote{margin:0;padding:10px;line-height:40px;}blockquote:before{float:left;content:"“";font-size:60px;color:#999;line-height:40px;}pre{background:#FFF;color:#333;font-size:18px;border-left:1px #333 solid;padding-left:10px;line-height:1.5;}';

var Curler = {
	start: function(link, res){
			var dl = new get(link);

			dl.asString(function(){
				var aa = arguments[1];
				read.parse(aa,'',function(result) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write('<!DOCTYPE html><html><head><meta charset="utf-8" /><title>'+ result.title +'</title><style type="text/css">' + style  + '</style></head><body>');
					res.write('<div id="main"><center>Node-Readability</center>');
					res.write('<div id="search"><form method="get" action="#"><input id="inputurl" type="text" name="url" /><input type="submit" value="Readable" /></form></div>');
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
  	res.write('<div id="search"><form method="get" action="#"><p><input id="inputurl" type="text" name="url" /><input type="submit" value="Readable" /></p></form></div>');
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
	//process.on('data',function(chunk) {
	//	console.log(chunk);
	//});
	
	//if ((req.url).indexOf('.css') !== 0) {
	//	res.writeHead(200, {'Content-Type': 'text/html'});
	//}
	//var aa =	url.parse(req.url, true);
	
	var searchUrl = url.parse(req.url, true);
	
	//console.log(searchUrl);
	if (searchUrl.query && searchUrl.query.url) {
		
		Curler.start(searchUrl.query.url, res);
	}	else {
		Form.show(res);
	}	
	
  //res.writeHead(200, {'Content-Type': 'text/plain'});
  //res.end('Hello World\n');
}).listen(8080, "127.0.0.1");

/*
 * TODO 
 * 1、做一个用户填写的默认界面，并能够获取到表单的数据[finished]
 * 2、重写一套样子
 * 3、动态的变化输出的编码。
 * 4、把静态文件的服务写出来，目前的style太囧了
 */


