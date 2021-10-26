// create variable to hold db connnection
let db;

// establish a connection to indexedDB db called '' and set it to version 1
const request = indexedDB.open('moolaTrack', 1);

// this event will emit if the db version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
    // save a reference to the db
    const db = event.target.result;
    // create an object store (table) called `new_moola_data`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_moola_data', { autoIncrement: true });
}

// upon a successful request
request.onsuccess = function(event) {
    // when db is successfully create with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.onLine) {
        // we haven't created this yet, but we will soon, so let's comment it out for now
        // uploadPizza();
    }
};

request.onerror = function(event) {
    // log error here
    console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit new moola data and there's no internet connection
function saveRecord(record) {
      // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['new_moola_data'], 'readwrite');

    // access the object store for `new_moola_data`
    const moolaObjectStore = transaction.objectStore('new_moola_data');

    // add record to your store with add method 
    moolaObjectStore.add(record);
}

function uploadMoolaData() {
    // open a transcation on your db
    const transcation = db.transaction(['new_moola_data'], 'readwrite')

    // access your object store
    const moolaObjectStore = transcation.objectStore('new_moola_data');

    // get all records from store and set to a variable
    const getAll = pizzaObjectStore.getAll();

    // more to come...
}