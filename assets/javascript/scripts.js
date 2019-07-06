//Javascript file
$(document).ready(function(){


// Initialize Firebase
var config = {
    apiKey: "AIzaSyD-MohMWjqWhNG4O9MxJzgNi3BrvIpYObg",
    authDomain: "train-schedule-41db0.firebaseapp.com",
    databaseURL: "https://train-schedule-41db0.firebaseio.com",
    projectId: "train-schedule-41db0",
    storageBucket: "",
    messagingSenderId: "1004474974866",
    appId: "1:1004474974866:web:4378597d369e9c78"
  };
  
    firebase.initializeApp(config);
  
  // Create a variable to reference the database
    
  var database = firebase.database();
  
//Create a button to add a train
  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    var train = $("#tName").val().trim();
    var destination = $("#tDes").val().trim();
    var firstTrain = $("#tFisrtTime").val().trim();
    var tFreq = $("#tFreq").val().trim();

    var newTrain = {
      train: train,
      destination: destination,
      firstTrain: firstTrain,
      frequency: tFreq,
    };

    database.ref().push(newTrain);
    
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    alert("Train successfully added.");

    $("#tName").val("");
    $("#tDes").val("");
    $("#tFisrtTime").val("");
    $("#tFreq").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var train = childSnapshot.val().train;
  var tDes = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var tFreq = childSnapshot.val().frequency;

  //train info
  console.log(train);
  console.log(tDes);
  console.log(firstTrain);
  console.log(tFreq);

  var newRow = $("<tr>").append(
         $("<td>").text(train),
         $("<td>").text(tDes),
         $("<td>").text(firstTrain),
         $("<td>").text(tFreq)
  );
  
    
  $("#trainTable > tbody").append(newRow); },
    function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  });