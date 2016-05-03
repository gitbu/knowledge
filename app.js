/**
 * Created by dell-bo on 2016/3/3.
 */
var express = require('express');
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var urlencode = require('urlencode');
var config = require('./config');
var app = express();
var createDomain = require('domain').create;

/********************转换post提交的json数据中间件****************/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.redirect('knowledge_detail.html');
});
//读取目录数据
app.get('/readTree', function(req, res){
    request({'url':config.url+'node/all.json?nodename=root','proxy':config.proxy},
         function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }else{
            res.sendStatus(response.statusCode);
        }
    })
});
//添加知识点
app.post('/addKb', function(req, res){
    request.post(config.url+"node/add.json",{form:{nodename:req.body.nodename,subnodename:req.body.subnodename,category:req.body.category},proxy:config.proxy},
            function (error, response, body) {
                    res.send(body);
            }
    )

});
//重命名
app.post('/treeRename', function(req, res){
    request.post(config.url+"node/modify.json",{form:{oldname:req.body.oldname,newname:req.body.newname,},proxy:config.proxy},
            function (error, response, body) {
                res.send(body);
            }
    )

});
//删除节点
app.post('/delNode', function(req, res){
    request.post(config.url+"node/remove.json",{form:{nodename:req.body.nodename},proxy:config.proxy},
            function (error, response, body) {
                res.send(body);
            }
    )

});
//读取模板
app.post('/readTemplate', function(req, res){
    request.post(config.url+"node/template/set.json",{form:{nodename:req.body.nodename,templateType:req.body.templateType},proxy:config.proxy},
            function (error, response, body) {
                res.send(body);
            }
    )

});
//读取知识点
app.get('/getNode', function(req, res){
    request({
            'url':config.url + 'content/getnode.json?nodename='+ urlencode(req.query.nodename)+
                '&country=' + urlencode(req.query.country) +
                '&province=' + urlencode(req.query.province) +
                '&city=' + urlencode(req.query.city) +
                '&channel=' + urlencode(req.query.channel) +
                '&path=' + urlencode(req.query.path),
            'proxy':config.proxy
        },
        function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }else{
            res.sendStatus(response.statusCode);
        }
        })
});
//读取在一定条件下的知识点
app.get('/getElement', function(req, res){
    request({
                'url':config.url + 'content/getelement.json?nodename='+ urlencode(req.query.nodename)+
                '&country=' + urlencode(req.query.country) +
                '&province=' + urlencode(req.query.province) +
                '&city=' + urlencode(req.query.city) +
                '&channel=' + urlencode(req.query.channel) +
                '&path=' + urlencode(req.query.path),
                'proxy':config.proxy
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.send(body);
                }else{
                    res.sendStatus(response.statusCode);
                }
            })
});
//更新知识点的节点
app.post('/updateElement', function(req, res){
    request.post(config.url+'content/update_element.json',{form:
        {nodename:req.body.nodename,
        country:req.body.country,
        province:req.body.province,
        city:req.body.city,
        channel:req.body.channel,
        content:req.body.content,
        path:req.body.path},
        'proxy':config.proxy},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }else{
                res.sendStatus(response.statusCode);
            }
        })
});
//更新知识点
app.post('/updateElements', function(req, res){
    request.post(config.url+'content/update_elements.json',{form:
        {elements:req.body.elements},
          'proxy':config.proxy},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }else{
                res.sendStatus(response.statusCode);
            }
        })
});
// 输入编辑理由
app.post('/editReason', function(req, res){
    request.post(config.url+'des/add.json',{form:
        {nodename:req.body.nodename,
         modifydescription:req.body.reason},
            'proxy':config.proxy},
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }else{
                res.sendStatus(response.statusCode);
            }
        })
});
app.get('/', function (req, res) {
    res.redirect('knowledge_detail.html');
});
//搜索知识点
app.get('/search', function(req, res){
    res.redirect('search_list.html?search=' + req.query.search +
                "&country=" + req.query.country +
                "&province=" + req.query.province +
                "&city=" + req.query.city);
});
// 获取知识点列表
app.get('/searchList', function(req, res){
    var url = 'http://112.33.2.66:8081/search/qa.json?'+
        'country=' + urlencode(req.query.country) +
        '&province=' + urlencode(req.query.province) +
        '&city=' + urlencode(req.query.city) +
        '&keywords=' + urlencode(req.query.keywords);
     request({
            'url':url,
            'proxy':config.proxy
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }else{
                res.sendStatus(response.statusCode);
            }
        })
});
//获取某个知识点
app.get('/viewNode', function(req, res){
    request({
            'url':config.url + 'content/all.json?nodename='+ urlencode(req.query.nodename)+
            '&country=' + urlencode(req.query.country) +
            '&province=' + urlencode(req.query.province) +
            '&city=' + urlencode(req.query.city) +
            '&channel=' + urlencode(req.query.channel),
            'proxy':config.proxy
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                res.send(body);
            }else{
                res.sendStatus(response.statusCode);
            }
        })
});
//Domain捕获异常
app.use(function(req, res, next) {
    var domain = createDomain();
    domain.on('error', function(err) {
        // alternative: next(err)
        console.log(err.stack);
        res.statusCode = 500;
        res.end(err.message + '\n');
        domain.dispose();
    });
    domain.enter();
    next();
});
app.use(express.static('public'));
app.use(express.static('views'));
// Express' errorHandler
function errorHandler(err, req, res, next) {
    console.error(err.stack);
}
app.use(errorHandler);
var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

