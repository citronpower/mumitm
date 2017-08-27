angular.module("app").controller("mainController", function ($scope, $location, $localStorage, mainFactory){

        $scope.init = function(){
            $scope.user = $localStorage.mumitm_user;

            $scope.get_images();
            $scope.get_ips();
        };

        $scope.get_images = function(){
            mainFactory.get_dirty_images().then(function(result){
                $scope.dirty_images = result;
            });
        };

        $scope.get_ips = function(){
            mainFactory.get_ips().then(function(result){
                $scope.ips = result;
            });
        };

        $scope.login = function(username, password){
            var login = {
                username: username,
                password: password
            };

            mainFactory.login(login).then(function(result){
                $localStorage.mumitm_user = result;
                $scope.user = result;
                $location.path("/");
            });
        };

        $scope.logout = function(){
            $localStorage.$reset();
            delete $scope.user;
            $location.path("/");
        };


        $scope.add_image = function(image, text){
            if(image){
                mainFactory.add_dirty_image(image, text).then(function(result){
                    if(result){
                        $scope.dirty_images.push(image.name);
                        if($scope.dirty_images.length==1){
                          mainFactory.start_mitm().then(function(result){
                            if(true){
                              console.log("MITM IS RUNNING");
                            }else{
                                console.log("MITM ERROR WHILE STARTING");
                            }
                          });
                        }
                    }
                });
            }
        };

        $scope.del_image = function(image){
            if(image) {
                mainFactory.del_dirty_image(image).then(function (result) {
                    if (result) {
                        $scope.dirty_images.splice($scope.dirty_images.indexOf(image), 1);
                        if($scope.dirty_images.length==0){
                          mainFactory.stop_mitm().then(function(result){
                             if(true){
                               console.log("MITM HAS STOPPED");
                             }else{
                                 console.log("MITM ERROR WHILE STOPPING");
                             }
                          });
                        }
                    }
                });
            }
        };

    $scope.add_ip = function(ip){
        if(ip && $scope.ips.indexOf(ip)==-1){
            mainFactory.add_ip(ip).then(function(result){
                if(result){
                    $scope.ips.push({ip:ip});
                }
            });
        }
    };

    $scope.del_ip = function(ip){
        if(ip){
            mainFactory.del_ip(ip._id).then(function(result){
                if(result){
                    $scope.ips.splice($scope.ips.indexOf(ip) ,1);
                }
            });
        }
    };

});
