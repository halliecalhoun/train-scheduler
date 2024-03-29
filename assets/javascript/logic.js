$(document).ready(function() { 


  // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDauBQhVpajz7SCYTAOk-K8rfzuUBSCOy8",
  //   authDomain: "train-scheduler-7b977.firebaseapp.com",
  //   databaseURL: "https://train-scheduler-7b977.firebaseio.com",
  //   projectId: "train-scheduler-7b977",
  //   storageBucket: "train-scheduler-7b977.appspot.com",
  //   messagingSenderId: "630308808831",
  //   appId: "1:630308808831:web:434e8f29449ec2d2"
  // };
  var firebaseConfig = {
    apiKey: "AIzaSyDcgmrXuPUJVdaHBA9zmqRJ93XtVpCg2NM",
    authDomain: "test-ac380.firebaseapp.com",
    databaseURL: "https://test-ac380.firebaseio.com",
    projectId: "test-ac380",
    storageBucket: "test-ac380.appspot.com",
    messagingSenderId: "71108507216",
    appId: "1:71108507216:web:3f15b67f7bd15545"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();
  
  var tMinutesTilTrain = 0;

  function displayRealTime() {
  setInterval(function(){
    $("#current-time").html(moment().format("hh:mm:ss a"))
  }, 1000);
  }
  displayRealTime();
  // var tableRow = "";
  // var getKey = "";

  $("#submit-btn").on("click", function() {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      // var empStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
      var firstTrainTime = moment($("#firstTrainTime-input").val().trim(), "hh:mm:ss a").format("X");
      var trainFrequency = $("#frequency-input").val().trim();

  
      // console.log(trainName);
      // console.log(trainDestination);
      // console.log(firstTrainTime);
      // console.log(trainFrequency);
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firstTime: firstTrainTime,
    frequency: trainFrequency,
  };
  // Uploads employee data to the database
  database.ref().push(newTrain);

  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});

// / 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTime;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(firstTrainTime);
  console.log(trainFrequency);

  // Prettify the employee start
  var firstTrainTimePretty = moment.unix(firstTrainTime).format("hh:mm a");

 var trainFrequency;
 var firstTrainTime = 0;

  var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm a").subtract(1, "years");

  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("HH:mm"));

  // find the diff between the times
  var diff = moment().diff(moment(firstTrainTimeConverted), "minutes");
  console.log("diff in time: " + diff);

  // find the time apart 
  var left = diff % trainFrequency;

  // mins til train
  var timeLeft = trainFrequency - left;
  console.log("minutes til train: " + timeLeft);

  // next train
  var minsLeft = moment().add(timeLeft, "minutes").format("hh:mm");
  console.log("arrival time: " + moment(minsLeft));

  

  // Calculate the months worked using hardcore math
  // To calculate the months worked
    // var minsAway = moment().diff(moment(firstTrainTime, "X"), "minutes");
    // console.log(firstTrainTime);

    // // // Calculate the total billed rate
    // var totalMinsAway = firstTrainTime - trainFrequency;
    // console.log(totalMinsAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(minsLeft),
    // $("<td>").text(empRate),
    $("<td>").text(timeLeft),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
})


  