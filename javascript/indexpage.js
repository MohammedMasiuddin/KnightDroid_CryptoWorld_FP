$(document).ready(function () {
    
    $.ajax({
        type: "get",
        url: "https://api.coinlore.net/api/global/",
        data: "",
        dataType: "json",
        success: function (response) {
            $("#Cryptocurrenciescount span").html(response[0].coins_count);
            $("#crptMarket span").html(response[0].active_markets);
            $("#marketcap span").html(response[0].total_mcap);
            $("#volumenum span").html(response[0].total_volume);
            $("#btcdom span").html(response[0].btc_d + "%");
            $("#ethdom span").html(response[0].eth_d + "%");
            $("#mcapchange span").html(response[0].mcap_change + "%");
            $("#volchange span").html(response[0].volume_change + "%");
            $("#avgchange span").html(response[0].avg_change_percent + "%");
        }
    });

});