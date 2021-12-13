export function indexdbdatabase(params) {
    
    
    if (!window.indexedDB) {
        console.log(`Your browser doesn't support IndexedDB`);
        return;
    }
    const request = indexedDB.open('Cryptoworld', 1);

    request.onerror = (event) => {
        console.error(`Database error: ${event.target.errorCode}`);
    };
    
    request.onsuccess = (event) => {
        // add implementation here
    };

    request.onupgradeneeded = (event) => {
        let db = event.target.result;
   
        // create the Contacts object store 
        // with auto-increment id
        let store = db.createObjectStore('Contacts', {
            autoIncrement: true
        });
   
        // create an index on the email property
        let index = store.createIndex('email', 'email', {
            unique: true
        });
    };

}