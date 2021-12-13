import { indexdbdatabase } from "./indexdbdatabase";

$(function () {
    
    $(".cryptodetails").remove();

    var cryptoid = window.location.search.split('=')[1]
console.log(cryptoid);


    

    $.ajax({
        type: "get",
        url: `https://api.coinlore.net/api/ticker/?id=${cryptoid}`,
        data: "",
        dataType: "json",
        success: function (response) {
            console.log(response);
            var temp = response[0]
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
                </div>
                
                `
                    );
        }
    });
    

    

    
});