


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDauBQhVpajz7SCYTAOk-K8rfzuUBSCOy8",
    authDomain: "train-scheduler-7b977.firebaseapp.com",
    databaseURL: "https://train-scheduler-7b977.firebaseio.com",
    projectId: "train-scheduler-7b977",
    storageBucket: "train-scheduler-7b977.appspot.com",
    messagingSenderId: "630308808831",
    appId: "1:630308808831:web:434e8f29449ec2d2"
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
    firstTrainTime: firstTrainTime,
    frequency: trainFrequency,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrainTime-input").val("");
  $("#frequency-input").val("");
});


  