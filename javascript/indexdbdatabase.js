export default function Indexdbdatabase(params) {

    // window.indexedDB = window.indexedDB || window.mozIndexedDB ||
    //     window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction ||
        window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
        window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }

    const recentVistedCrypto = [
        { id: "01", name: "testing", nameid: "test", cryptoid: "99999" },
    ];
    var db;
    var request = window.indexedDB.open("CryptoWorld", 1);

    request.onerror = function(event) {
        console.log("error: ");
     };
     
     request.onsuccess = function(event) {
        db = request.result;
        console.log("success: "+ db);
     };
     request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("cryptos", {keyPath: "id"});
        
        for (var i in recentVistedCrypto) {
           objectStore.add(recentVistedCrypto[i]);
        }
     }


     function read () {
        var transaction = db.transaction(["cryptos"]);
        var objectStore = transaction.objectStore("cryptos");
        var request = objectStore.get("00-03");
        
        request.onerror = function(event) {
           alert("Unable to retrieve daa from database!");
        };
        
        request.onsuccess = function(event) {
           // Do something with the request.result!
           if(request.result) {
              console.log("iod");
           } else {
              alert("couldn't be found in your database!");
           }
        };
     }

}