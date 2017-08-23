var mongoose = require('mongoose');

var ipSchema = new mongoose.Schema({
    ip : { type : String, required: true}
});

var ipModel = mongoose.model('ips', ipSchema);

exports.add_ip = function(ip, done){
    var nIp = new ipModel({ip: ip});

    nIp.save(function(err, result){
       if(err){
           done(false)
       }else{
           done(result)
       }
    });
};

exports.get_ip_by_x_y = function(attributs, values, done){
    var query = ipModel.find(null);

    if(attributs.length == values.length){
        for (var i = 0; i < attributs.length; i++) {
            query.where(attributs[i], values[i]);
        }
    }

    query.exec(function(err, result){

        if(err){
            done(false);
        }else{
            done(result);
        }
    });
};

exports.update_ip = function(attributs, values ,done){
    ipModel.update(attributs, values, { multi : false }, function(err, result){

        if(err){
            done(false)
        }else{
            done(true);
        }
    });

};

exports.delete_ip = function(id, done){
    ipModel.remove({_id: id}, function(err){
        if(err){
            done(false);
        }else{
            done(true);
        }
    });
};
