$(function () {

    var form;
    console.log("ready");


    $(`#emailid`).focusout(function (e) { 
        checkemail()
    });

    $(`#pass`).focusout(function (e) {
        checkpassword()
    });


    function emailIsValid(email) {
        let pattern = /\S+@\S+\.\S+/;
        return pattern.test(email);
      }

    function checkemail() {
    var v = $(`#emailid`).val();
    if (!emailIsValid(v)) {
        $(`#erroremailid`).html("please enter a valid email");
        $(`#emailid`).css('border-bottom', '1px solid red');
        $(`#erroremailid`).css("color","red");
        form = false

    }else{
     $(`#erroremailid`).hide();
     $(`#emailid`).css('border-bottom', '1px solid green');
     var form = true;
    }
}

function checkpassword() {
    var v = $(`#pass`).val();
    if (v = null || v == '' || v.length < 6) {
        $(`#errorPass`).html("please enter a valid password");
        $(`#pass`).css('border-bottom', '1px solid red');
        $(`#errorPass`).css("color","red");
         form = false
    }else{
     $(`#errorPass`).hide();;
     $(`#pass`).css('border-bottom', '1px solid green');
     var form = true;
    }
}




    $("#signin").on("click", function () {
        console.log("sdfsfds");
        checkemail();
        checkpassword();
        if (form) {
         login();
        }
         
     });

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