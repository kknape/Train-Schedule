//The Trivia Game - My javascript file //
$(document).ready(function(){

    //User clicks "start" to begin the game. Timer starts, question sets are displayed.
        $(document).on('click', '#start', function(){
            game.start();
        })
    
        $(document).on('click', '#end', function(){
            game.done();
        })
    
        $(document).on('click', '#replay', function(){
            game.reset();
        })
    
    //questions array
    var questions = [
        {   triviaQuestion: "The Wolverines were a band of teenage freedom fighters in what movie that imagined a Soviet attack in the heart of the United States?",
            answerOptions: ["Red Dawn", "War Games", "Born on the Fourth of July"],
            correctAns: "Red Dawn"
             },
    
        {   triviaQuestion: "Whose first big hit was as a Seattle teen hacker in the 1983 hit 'War Games'?",
            answerOptions: ["River Phoenix", "John Cusack", "Matthew Broderick"],
            correctAns: "Matthew Broderick"
             },
    
        {   triviaQuestion: "Which of these actors was not in the 1986 hit, 'Stand By Me'?",
            answerOptions: ["Kiefer Sutherland", "Matt Damon", "River Pheonix"],
            correctAns: "Matt Damon"
             },
    
        {   triviaQuestion: "In what 1984 teen comedy can you spot the brother and sister duo, Joan and John Cusack?",
             answerOptions: ["Sixteen Candles", "Ferris Bueller's Day Off", "The Goonies"],
             correctAns: "Sixteen Candles"
              },
    
         {   triviaQuestion: "Iron Man actor, Robert Downey Jr., also made an appearance in what 1985 comedy about two teens that create a beautiful woman, named Lisa?",
             answerOptions: ["The Princess Bride", "Weird Science", "Stand By Me"],
             correctAns: "Weird Science"
              },
    
         {   triviaQuestion: "What 1982 comedy, does Sean Penn play surfer dude, Jeff Spicoli?",
             answerOptions: ["Ferris Bueller's Day Off", "Fast Times at Ridgemont High", "The Breakfast Club"],
             correctAns: "Fast Times at Ridgemont High"
              },
    
        {   triviaQuestion: "Which of these Chicago attractions does Ferris Beuller not visit on his day off?",
              answerOptions: ["Sears Tower", "Metropolitan Museum of Art", "Wrigley Field"],
              correctAns: "Metropolitan Museum of Art"
               },
    
        {   triviaQuestion: "Which 1980s hit does not feature actress Molly Ringwald?",
              answerOptions: ["Pretty in Pink", "The Breakfast Club", "Some Kind of Wonderful"],
              correctAns: "Some Kind of Wonderful"
               }
          ];
        
        var timer= undefined; //made global to facilitate the replay & reset the timer
         
        //game object includes game functions
        var game = {
            correct: 0,
            incorrect: 0,
            unasnwered: 0,
            counter: 60,
            countdown: function(){
                game.counter--;
                $("#counter").html(game.counter);
                if (game.counter < 0){
                    alert("Time is up!");
                    game.done();
        //            clearInterval(timer);
                    }
                },
            start: function() {         
                timer = setInterval(game.countdown,1000);
                    $("#qWrapper").prepend('<div id="timer">Time Remaining: <span id="counter">60</span> seconds</div>');
                    $("#myInstructions").remove(); //remove instruction text
                    $("#start").remove(); //removes Start button after clicked
                        for (var i=0; i<questions.length; i++){
                            $("#qWrapper").append('<div class="triviaQuestion">' + questions[i].triviaQuestion + '</div>')
                    
                         for (var j=0; j<questions[i].answerOptions.length; j++) {  
                            $("#qWrapper").append("<div class='form-check'></<div><input class='form-check-input answerInput' type='radio' name='triviaQuestion-"+i+"' value='"+questions[i].answerOptions[j]+"'>"+
                            "<label class='form-check-label answerItems' for='triviaQuestion-"+i+"'> "+ questions[i].answerOptions[j] +" </label>")
                           }
                         }
                        
                   $("#qWrapper").append('<div class="row" id="bWrapper"><div class="col-12-lg mx-auto"> <button id="end" class="button2">Done</button></div></div>')    //adds Done button if user finishes answering before timer is up 
                },
            done: function(){
                clearInterval(timer);
                $.each($("input[name='triviaQuestion-0']:checked"),function(){
                    if($(this).val()==questions[0].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-1']:checked"),function(){
                    if($(this).val()==questions[1].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-2']:checked"),function(){
                    if($(this).val()==questions[2].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-3']:checked"),function(){
                    if($(this).val()==questions[3].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-4']:checked"),function(){
                    if($(this).val()==questions[4].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-5']:checked"),function(){
                    if($(this).val()==questions[5].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-6']:checked"),function(){
                    if($(this).val()==questions[6].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                $.each($("input[name='triviaQuestion-7']:checked"),function(){
                    if($(this).val()==questions[7].correctAns){
                        game.correct++;
                    }
                    else {
                        game.incorrect++;
                    }
                });
                this.result();
                },
            result: function(){
                 $("#qWrapper h2").remove();
                 $("#qWrapper").html('<div id="allDone">All done!</div>');
                 $("#qWrapper").append('<div id="correctA">Correct Answers:  ' +this.correct+'</div>');
                 $("#qWrapper").append('<div id="incorrectA">Incorrect Answers:  ' +this.incorrect+'</div>');
                 $("#qWrapper").append('<div id="unanswered">Unanswered Questions:  ' +(questions.length-(this.incorrect+this.correct))+'</div>');
                 $("#qWrapper").append('<div class="row" id="bWrapper"><div class="col-12-lg mx-auto"><button id="replay" class="button2">Replay</button></div></div>')
                 game.counter=60;
                 timer=undefined;
                },
            reset: function(){
                game.correct=0;
                game.incorrect=0; 
                game.unanswered=0;
                $("#insText").append('<p class="lead" id="myInstructions">You have 60 seconds to see how many questions you can answer correctly.</p>'); 
                $("#qWrapper").empty();
                $("#qWrapper").append('<div class="row" id="bWrapper"><div class="col-12-lg mx-auto"><button id="start" class="button2">Start</button></div></div>');   
                }
            }
         //end of game object
    //doc-ready closing tag
    });