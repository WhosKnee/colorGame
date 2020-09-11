var numOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    //event listeners for mode button
    setupModeButtons();
    //event listeners for squares
    setupSquares();
    //reset the game colors and such
    reset();
}

function setupModeButtons(){
    for(var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            // have to hardcode the removal of selected class
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            // add the selected class on the right button
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numOfSquares = 3;
            }
            else {
                numOfSquares = 6;
            }
            reset();
        })
    }
}

function setupSquares(){
    for(var i = 0; i <squares.length; i++){
        //add click listeners for squares
        squares[i].addEventListener("click",function(){
            //get the color of the square selected
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
            }
            else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

function reset(){
    //generate all new colors
    colors = generateRandomColors(numOfSquares);
    //pick a new random color
    pickedColor = pickColor();
    // change the displayed color
    colorDisplay.textContent = pickedColor;
    //change colors of the squares
    for(var i=0; i< squares.length; i++){
        if(colors[i]){
            // ensure that the square is visible
            squares[i].style.display = "block";
            // assign color
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
    // change h1 color to nothing
    h1.style.backgroundColor = "steelblue";
    // reset tehe message string to none
    messageDisplay.textContent = "";
    // reset the left button to new colors
    resetButton.textContent = "New Colors";
    
}

resetButton.addEventListener("click", function(){
    reset();
})



colorDisplay.textContent = pickedColor;

function assignColors(){
    
}

// called to change all squares to a specific color
function changeColors(color){
    //loop through each square
    for(var i =0; i < squares.length; i++){
        //change color in square
       squares[i].style.backgroundColor = color;
    }
    
}

// will pick the color which will be "correct"
function pickColor(){
    //Math.random() * colors.length will have an
    // upper bound of 5.9999 and since we are
    // flooring the max will be 5
    
    //Math.random = (0,1) excluding 0 and 1
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// generates all of the colors for the squares
function generateRandomColors(num){
    //make an arrary
    var arr = [];
    //add <num> random colors to the array
    for(var i = 0; i < num; i++){
        // create and assign random color
        arr[i] = randomColor();
    }
    // return the array
    return arr;
}

// generates a random color
function randomColor(){
    // pick a red, green, and blue
    // will be (0,256)
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    //create string
    var color = "rgb(" + red +", " + green +", " + blue +")";
    
    return color
}