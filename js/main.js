var indexedDB = window.indexedDB;

// open or create the database
var open = indexedDB.open('ShuttlesDatabase', 1);

// open or create the schema
open.onupgradeneeded = function() {
  var db = open.result;
  var store = db.createObjectStore('Missions', {keyPath: "id"});
};

// handle errors
open.onerror = function(event) {
  console.log(
    'Houston, we have problem: ' + event.target.errorCode
  );
};

open.onsuccess = function() {
  // begin the transaction
  var db = open.result;
  var transaction = db.transaction('Missions', 'readwrite');
  var objectStore = transaction.objectStore('Missions');

  // add data
  objectStore.put({
    id: "STS-41-D",
    shuttle: "Discovery",
    crew: 6,
    launchDate: new Date(1984, 07, 30, 12, 41, 50) // 30 August 1984 12:41:50
  });
  objectStore.put({
    id: "STS-51-J",
    shuttle: "Atlantis",
    crew: 5,
    launchDate: new Date(1985, 09, 03, 15, 15, 30) // 3 October 1985 15:15:30
  });

  // query our data
  var getDiscovery = objectStore.get('STS-41-D');
  var getAtlantis = objectStore.get('STS-51-J');

  getColumbia.onsuccess = function() {
    console.log(getDiscovery.result.shuttle);
  };

  getChallenger.onsuccess = function() {
    console.log(getAtlantis.result.launchDate);
  };

  // close the db when the transaction is done
  transaction.oncomplete = function() {
    db.close();
  };
}
