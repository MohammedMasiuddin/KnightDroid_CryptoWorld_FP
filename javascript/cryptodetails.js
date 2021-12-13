

$(function () {

    $(".cryptodetails").remove();
    $(`#showrecent`).hide();

    $(`.islogin`).on(`click`, function () {
        if (confirm("Press a button!")) {
            window.localStorage.clear()
            window.location.reload();
          } else {
            // 
          }
    });


    islogin()

    function islogin(params) {
        
    var api_key = "AIzaSyAtHSQ6WaSr0XPEI9c9UTs0pokbwguB8RU"


    var mystorage = window.localStorage;
    var mytoken = mystorage.getItem("refreshToken") ;

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



    var cryptoid = window.location.search.split('=')[1]
    console.log(cryptoid);


    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    const recentVistedCrypto = [
        { id: "99999", name: "testing", nameid: "test",rank:"99999", cryptoid: "99999" },
    ];
    var db;
    var request = window.indexedDB.open("CryptoWorld", 1);

    request.onerror = function (event) {
        console.log("error: ");
    };


    request.onsuccess = function (event) {
        
        db =  event.target.result;
        console.log("success: " + db);
        var objectStore = db.transaction("cryptos").objectStore("cryptos");
            
        let request = objectStore.getAll()
        request.onsuccess = function() {
           console.log(request);
           console.log(request.result)
           request.result.forEach(element => {
            $(`.recentview`).append(
                `
                <div id="crypto${element.id}" class="childcrypto crpto">
                  <img id="cryptoimage" src="https:www.coinlore.com/img/${element.nameid}.png" alt="bitcoin">
                  <div class="cardtext">
                      <p id="name"> <b>Name :</b>${element.name}</p>
                      <p id="rank"> <b>Rank :</b>${element.rank}</p>
                  </div>
              </div>
                `
            )
            $(`#showrecent`).show();

            $(`#crypto${element.id}`).on("click", function () {
                var baseurl = window.location.origin + `/cryptodetails.html?cryptoid=${element.id}`
                window.location.href = baseurl;
                console.log(baseurl);
                console.log(temp);
            });
           });      
        };
    };
    request.onupgradeneeded = function (event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("cryptos",  {keyPath: 'id'} );

    }


   function addtorecents(params) {
    var transaction = db.transaction("cryptos", "readwrite"); // (1)

    // get an object store to operate on it
    var crypt = transaction.objectStore("cryptos"); // (2)
    
    var temp = { id:params.id, symbol:params.symbol, name: params.name, nameid: params.nameid,rank: params.rank, cryptoid: params.id };
    
    var request = crypt.add(temp); // (3)

    var req = crypt.dele
    
    request.onsuccess = function() { // (4)
      console.log("Book added to the store", request.result);
    };
    
    request.onerror = function() {
      console.log("error", request.error);
    };
   }


    $.ajax({
        type: "get",
        url: `https://api.coinlore.net/api/ticker/?id=${cryptoid}`,
        data: "",
        dataType: "json",
        success: function (response) {
            console.log(response);
            var temp = response[0]
            addtorecents(temp);
            $(".container").append(

                `
                <div  class="cryptodetails">
                    <img id="cryptoimage" src="https:www.coinlore.com/img/${temp.nameid}.png" alt="bitcoin">
                    
                    <div class="cardtext">
                        <p id="symbol"><b>Symbol :</b> ${temp.symbol}</p>
                        <p id="name"> <b>Name :</b> ${temp.name} </p>
                        <p id="rank"> <b>Rank :</b> ${temp.rank} </p>
                        <p id="price_usd"><b>Price :</b> ${temp.price_usd} </p>
                        <p id="price_usd"><b>Percentage change in 1hr :</b> ${temp.percent_change_1h} </p>
                        <p id="price_usd"><b>Percentage change in 24hrs :</b> ${temp.percent_change_24h} </p>
                        <p id="price_usd"><b>Percentage change in 7ds :</b> ${temp.percent_change_7d} </p>
                        <p id="price_usd"><b> Market Capital in Usd :</b> ${temp.market_cap_usd} </p>
                        <p id="price_usd"><b>Circulating  supply :</b> ${temp.csupply} </p>
                        <p id="price_usd"><b>Total supply :</b> ${temp.tsupply} </p>
                        <p id="price_usd"><b>Maximum supply :</b>  ${temp.msupply} </p>
                        <p id="price_usd"><b>Price in BTC (price_btc) :</b> ${temp.price_btc} </p>
                    </div>

                    <Button class="favourate">
                        Add to favourates <i class="fas fa-heart"></i>
                    </Button>
                </div>
                
                `
            );

            var mystorage = window.localStorage;
            var mylocalid = mystorage.getItem("localId")

            var udata = {
                myfavourate: [
                    cryptoid
                ]
            }

            $(`.favourate`).on(`click`, function () {
                console.log("dfsf");
                $.ajax({
                    type: "POST",
                    url: `https://crytoworld-ad40f-default-rtdb.firebaseio.com/users/${mylocalid}/data.json`,
                    data: JSON.stringify(udata),
                    dataType: "dataType",
                    success: function (response) {
                        console.log(response);
                    },
                    error:function (error) {
                        console.log(error);
                    }
                });
            });
        }
    });





});