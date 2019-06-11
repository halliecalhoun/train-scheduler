


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

  // var tableRow = "";
  // var getKey = "";

  $("#submit-btn").on("click", function() {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var firstTrainTime = $("#firstTrainTime-input").val().trim();
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
  var firstTrainTimePretty = moment.unix(firstTrainTime).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
    // var empMonths = moment().diff(moment(empStart, "X"), "months");
    // console.log(empMonths);

    // // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(firstTrainTimePretty),
    $("<td>").text(trainFrequency),
    // $("<td>").text(empRate),
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});



  