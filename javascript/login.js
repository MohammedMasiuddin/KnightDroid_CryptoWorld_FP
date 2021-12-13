$(function () {
    console.log("on ready");



    function login() {
        var email = $(`#email`).val();
        var password = $(`#passWord`).val();
        var data = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        $.ajax({
            type: "POST",
            url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api_key}`,
            data: JSON.stringify(data),
            dataType: "json",
            contentType:"application/json",
            success: function (response) {
                console.log(response);
            },
            error:function (error) {
                console.log(error);
                alert(` something went wrong : ${error.responseJSON.error.message}`)
              }
            
        });
    }

    
});