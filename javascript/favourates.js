$(function () {
    


    islogin()

    var mystorage = window.localStorage;
    var mylocalid = mystorage.getItem("localId")

    $.ajax({
        type: "GET",
        url: `https://crytoworld-ad40f-default-rtdb.firebaseio.com/users/${mylocalid}/data.json`,
        dataType: "json",
        success: function (response) {
            console.log(response);
            
        }
    });



    function islogin(params) {
        
    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"


    var mystorage = window.localStorage;
    mytoken = mystorage.getItem("refreshToken");

    var somedata = {
        "grant_type":"refresh_token",
        "refresh_token":mytoken
    }
    $.ajax({
        type: "POST",
        url: `https://securetoken.googleapis.com/v1/token?key=${api_key}`,
        data: `grant_type=refresh_token&refresh_token=${mytoken}`,
        dataType: "json",
        ContentType: `application/x-www-form-urlencoded`,
        success: function (response) {
            console.log(mytoken);
            console.log("login");
            console.log(response);
            $(`.islogin`).show()
            
        },
        error:function (error) {
            console.log(error);
            $(`.islogin`).hide()
          }
    });


});