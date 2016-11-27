var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username : { type : String, match: /^[a-zA-Z0-9-_]+$/ , required: true},
    password: {type: String, required: true}
});

var UserModel = mongoose.model('users', userSchema);

exports.add_user = function(user, done){
    var nUser = new UserModel({username: user.username,
                                password: user.password});

    nUser.save(function(err, result){
       if(err){
           done(false)
       }else{
           delete result.password;
           done(result)
       }
    });
};

exports.get_user_by_x_y = function(attributs, values, done){
    var query = UserModel.find(null);

    if(attributs.length == values.length){
        for (var i = 0; i < attributs.length; i++) {
            query.where(attributs[i], values[i]);
        }
    }

    query.exec(function(err, result){

        if(err){
            done(false);
        }else{
            for(var i = 0; i<result.length; i++){
                result[i].password = "";
            }
            done(result);
        }
    });
};

exports.update_user = function(attributs, values ,done){
        UserModel.update(attributs, values, { multi : false }, function(err, result){

        if(err){
            done(false)
        }else{
            done(true);
        }
    });

};

exports.delete_user = function(id, done){
    UserModel.remove({_id: id}, function(err){
        if(err){
            done(false);
        }else{
            done(true);
        }
    });
};