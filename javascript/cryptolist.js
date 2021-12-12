$(function () {
    var datalistcount = 0;
    addmore(datalistcount);
    // $("#crpto").remove();

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
                       ` <div id="crpto"  class="childcrypto" >
                    <p id="symbol" >${valueOfElement.symbol}</p>
                    <p id="name">${valueOfElement.name} </p>
                    <p id="rank">${valueOfElement.rank} </p>
                    <p id="price_usd"> $ ${valueOfElement.price_usd} </p>
                </div>`
                    );
                });
            }
        });
      }

    
});