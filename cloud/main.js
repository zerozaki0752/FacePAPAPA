// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//var user = require(cloud/user.js);

// 创建AV.Object子类.
var UserInfo = AV.Object.extend("UserInfo");

AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


function newGuid()
{
    var guid = "";
    for (var i = 1; i <= 32; i++){
        var n = Math.floor(Math.random()*16.0).toString(16);
        guid +=   n;
        if((i==8)||(i==12)||(i==16)||(i==20))
            guid += "-";
    }
    return guid;
}


//全新注册
AV.Cloud.define('register', function(request, response) {

    var success = false;
    var count = 10;
    var username;
    var password;
    var email;
    do{
        username = "123456";
        password = "qweqwe123";
        email = username + "@qq.com";

        if (username && password && email)
        {
            var user = new AV.User();
            user.set("username",username);
            user.set("password", password);
            user.set("email", email);

            user.signUp(null, {
                success: function(user) {
                    success = true;
                },
                error: function(user, error) {
                    success = false;
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    }while(success || --count<=0)

    if (success)
    {
//        response.write('success ' + username);
        response.success(username);
    }
    else
    {
//        response.write('false ');
        response.error('false');
    }



});

//关联新设备

//登录
AV.Cloud.define('login', function(request, response) {

    var username = request.params.username;
    var password = "qweqwe123";

    AV.User.logIn(username, password, {
                  success: function(user) {
                  // Do stuff after successful login.
                  },
                  error: function(user, error) {
                  // The login failed. Check error to see why.
                  }
    });
});