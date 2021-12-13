$(function () {
    var datalistcount = 0;
    var datalist = 0;
    addmore(datalistcount);
    $(".crpto").remove();

    islogin()

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


    }

    console.log(window.location.origin);

    $("#loadmore").on("click", function () {
        datalistcount = datalistcount+12;
        addmore(datalistcount)
    });

    function addmore (d){
        $.ajax({
            type: "get",
            url: `https://api.coinlore.net/api/tickers/?start=${d}&limit=12`,
            data: "",
            dataType: "json",
            success: function (response) {
                console.log(response);
                $.each(response.data, function (indexInArray, valueOfElement) { 
                    var temp = datalist
                    $(".container").append(
                     
                `
                <div id="crypto${datalist}" class="childcrypto crpto">
                    <img id="cryptoimage" src="https:www.coinlore.com/img/${valueOfElement.nameid}.png" alt="bitcoin">
                    <div class="cardtext">
                        <p id="symbol"><b>Symbol :</b> <span> ${valueOfElement.symbol} </span> </p>
                        <p id="name"> <b>Name :</b>${valueOfElement.name}</p>
                        <p id="rank"> <b>Rank :</b>${valueOfElement.rank}</p>
                        <p id="price_usd"><b>Price :</b>$ ${valueOfElement.price_usd}</p>
                    </div>
                </div>
                `
                    );
                    $(`#crypto${datalist}`).on("click", function () {
                        var baseurl = window.location.origin + `/cryptodetails.html?cryptoid=${valueOfElement.id}`
                        window.location.href = baseurl;
                        console.log(baseurl);
                        console.log(temp);
                    });
                    datalist++;


                });
            }
        });
      }

    
});