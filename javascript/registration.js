$(function () {
    console.log("ready");

    $("#formbtn").on("click", function () {
        console.log("sdfsfdsddfsaf");

    });

    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"

    function registor() {
        $.ajax({
            type: "POST",
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api_key}`,
            data: '{"email":"user1@gmail.com","password":"123456","returnSecureToken":true}',
            dataType: "json",
            contentType:"application/json",
            success: function (response) {
                console.log(response);
            },
            
        });
    }
});