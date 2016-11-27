angular.module("app").factory("mainFactory", ['$http', 'Upload', function ($http, Upload){

    var get_dirty_images = function(){
        return $http.get("/get/dirty_images")
            .then(function(response) {
                return response.data;
            }, function(response) {
                return false;
            });
    };

    var login = function(login){
        return $http.post("/login", login)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return false;
            });
    };

    var add_dirty_image = function(image){
        return Upload.upload({
                url: '/add/dirty_image',
                data: {image: image}
            }).then(function(response) {
                return response.data;
            }, function(response) {
                return false;
            });
    };

    var del_dirty_image = function(image){
        return $http.delete("/del/dirty_image="+image)
            .then(function(response) {
                return response.data;
            }, function(response) {
                return false;
            });
    };

    return {
        get_dirty_images: get_dirty_images,
        add_dirty_image: add_dirty_image,
        del_dirty_image: del_dirty_image,
        login: login
    };
}
]);