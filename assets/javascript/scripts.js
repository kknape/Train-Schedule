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
  
  var nextTrain = undefined;
  var tMinutesTillTrain = undefined;

//Create a button to add a train
  $("#addTrainBtn").on("click", function(event) {
    event.preventDefault();

    var train = $("#tName").val().trim();
    var destination = $("#tDes").val().trim();
    var firstTrain = $("#tFisrtTime").val().trim();
    var tFreq = $("#tFreq").val().trim();

 function nextArrival(){
      //First departure time
      var firstTimeConvert = moment(firstTrain, "HH:mm").subtract(1, "years");

      //Current time
      var currentTime = moment();

      //Difference between times
      var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
    }
 
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
    
    //clear the fields
    $("#tName").val("");
    $("#tDes").val("");
    $("#tFisrtTime").val("");
    $("#tFreq").val("");
  });

  //get info from db to display on the page
  database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //get snapshot from db
  var train = childSnapshot.val().train;
  var tDes = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var tFreq = childSnapshot.val().frequency;

        function nextArrival(){
            
          //First departure time
          var firstTimeConvert = moment(firstTrain, "hh:mm").subtract(1, "years");
          console.log(firstTimeConvert);

          //Current time
          var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

          //Difference between times
          var diffTime = moment().diff(moment(firstTimeConvert), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);

          // Time apart (remainder)
          var tRemainder = diffTime % tFreq;
          console.log(tRemainder);

          // Minute Until Train
          tMinutesTillTrain = tFreq - tRemainder;
          console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

          // Next Train
          nextTrain = moment().add(tMinutesTillTrain, "minutes");
          console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
              }

//console log snapshot data from db
      console.log(train);
      console.log(tDes);
      console.log(firstTrain);
      console.log(tFreq);
      console.log(nextArrival());
      
//create a variable to create new row of entries in the table
      var newRow = $("<tr>").append(
            $("<td>").text(train),
            $("<td>").text(tDes),
            $("<td>").text(tFreq),
            $("<td>").text(moment(nextTrain).format("hh:mm a")),
            $("<td>").text(tMinutesTillTrain + " min"),
      );
  
//display new row of entries on the page
          $("#trainTable > tbody").append(newRow); },
                //error handling 
                function(errorObject) {
                  console.log("The read failed: " + errorObject.code);
                });

  });