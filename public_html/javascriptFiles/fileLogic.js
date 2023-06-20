// Declare and export a variable named "wordlMapFileT"
let wordlMapFileT, bug1FileT, bug2FileT;
exports = { wordlMapFileT, bug1FileT, bug2FileT };

// Select the file input element and textarea element from the HTML document
let fileInputElement = document.getElementById("inputGroupFile02");
let fileInputElementBugCodeRed = document.getElementById("inputGroupFile03");
let fileInputElementBugCodeBlack = document.getElementById("inputGroupFile04");

let textarea = document.querySelector('textarea');

// Declare several other variables but do not assign them any value
let numIterations, logsEnabled, wordlMapFile, bug1File, bug2File, iteration;
let files;
let shouldUpdate = false;

// If the file input element exists
if (fileInputElement || fileInputElementBugCodeRed || fileInputElementBugCodeBlack) {
    fileInputElementBugCodeRed.addEventListener("change", function (event) {
        event.preventDefault();
        console.log('red');
        const bug1F = document.getElementById("inputGroupFile03").files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            // Get the file content
            var bin = e.target.result;
            // Store the file content in the "wordlMapFileT" variable
            bug1FileT = bin;
            // Split the file content into an array of lines
            console.log(bug1FileT)
            const lines = bin.split(/\r\n|\n/);
        };
        reader.readAsText(bug1F);
       
    });

    fileInputElementBugCodeBlack.addEventListener("change", function (event) {
        event.preventDefault();
        console.log('black');
        const bug2F = document.getElementById("inputGroupFile04").files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            // Get the file content
            var bin = e.target.result;
            // Store the file content in the "wordlMapFileT" variable
            bug2FileT = bin;
            console.log(bug2FileT)
            // Split the file content into an array of lines
            const lines = bin.split(/\r\n|\n/);
        };
        reader.readAsText(bug2F);
    });

    // Add an event listener to detect changes in the selected file
    fileInputElement.addEventListener("change", function (event) {
        event.preventDefault();

        // Get the values of several HTML elements
        numIterations = document.getElementById("iterations").value;
        console.log(numIterations);
        logsEnabled = document.getElementById("flexSwitchCheckDefault").checked;
        wordlMapFile = document.getElementById("inputGroupFile02").files[0];
        

        // Use the FileReader API to read the contents of the selected file

        var reader = new FileReader();
        reader.onload = function (e) {
            // Get the file content
            var bin = e.target.result;
            // Store the file content in the "wordlMapFileT" variable
            wordlMapFileT = bin;
            console.log(wordlMapFileT)
            // Split the file content into an array of lines
            const lines = bin.split(/\r\n|\n/);
        };
        reader.readAsText(wordlMapFile);
    });

    // Add an event listener to detect form submission
    document.getElementById("firstForm").addEventListener("submit", function (event) {
        event.preventDefault();
        // Redirect to a new HTML page to display the simulation
        document.write("<style> #page { display:flex; height:75%; width:100%} #board { display:block; width:70%} #stats-menu {display: block; width: 30%; text-align: left; margin-top:10%; align-items:left}</style><!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Simulation</title><link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD' crossorigin='anonymous'></head><body><script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js' integrity='sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN' crossorigin='anonymous'></script><div id='page'><div id='board'><canvas id='canvas' width='600' height='600'></canvas></div>       <div id = 'stats-menu'><div class='d-grid gap-2 col-6 mx-auto container'><a class='btn btn-primary' role='button' id = 'option-menu'>Options</a></div><div class='d-grid gap-2 col-6 mx-auto container'><a class='btn btn-primary' href='index.html' role='button'>Quit</a></div><div class = 'stat-area' id = 'iteration-count'>Iteration: </div><div class = 'stat-area' id = 'undetected-food'>Amount of undetected food: </div><div class = 'stat-area' id = 'red_bug_alive'>Red bugs remaining: </div><div class = 'stat-area' id = 'red_bug_dead'>Red bugs killed: </div><div class = 'stat-area' id = 'red_food'>Food brought home for red bugs: </div><div class = 'stat-area' id = 'black_bug_alive'>Black bugs remaining: </div><div class = 'stat-area'id = 'black_bug_dead'>Black bugs killed: </div><div class = 'stat-area' id = 'black_food'>Food brought home for black bugs: </div></div></div><script src = 'javascriptFiles/Sprite.js'></script><script src = 'javascriptFiles/classes/Cell.js'></script><script src = 'javascriptFiles/classes/World.js'></script><script src = 'javascriptFiles/classes/Bug.js'></script><script src='javascriptFiles/gui.js'></script></body></html>");
        
        //defaults the iteration to 0
        iteration = 0; 
        shouldUpdate = true;
    });
    
    //Iteration updater function
    function updateStats(){
        if(shouldUpdate){
            iteration++;
            var iteration_text = document.getElementById("iteration-count");
            iteration_text.textContent = "Iteration: " + iteration + "/" + numIterations;
            console.log(numIterations) //tester

            //stops increasing intervals when limit reached
            if (iteration >= numIterations) {
                clearInterval(stats_interval);
            }
        }
    }

    //Iteration updater function called with ticks of 1000 ms
    var stats_interval = setInterval(updateStats,1000);
  
}

