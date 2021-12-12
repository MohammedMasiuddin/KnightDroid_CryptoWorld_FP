$(function () {
    var datalistcount = 0;
    addmore(datalistcount);
    $("#crpto").remove();

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
                    $(".container").append(
                     
                `
                <div id="crpto" class="childcrypto">
                    <img id="cryptoimage" src="https:www.coinlore.com/img/${valueOfElement.nameid}.png" alt="bitcoin">
                    <div class="cardtext">
                        <p id="symbol"><b>Symbol :</b>${valueOfElement.symbol}</p>
                        <p id="name"> <b>Name :</b>${valueOfElement.name}</p>
                        <p id="rank"> <b>Rank :</b>${valueOfElement.rank}</p>
                        <p id="price_usd"><b>Price :</b>$ ${valueOfElement.price_usd}</p>
                    </div>
                </div>
                `
                    );
                });
            }
        });
      }

    
});