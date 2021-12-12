$(function () {
    var datalistcount = 0;
    var datalist = 0;
    addmore(datalistcount);
    $(".crpto").remove();

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