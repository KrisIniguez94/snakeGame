var snakeX = 2;
var snakeY = 2;
var height = 38;
var width = 60;
var score = 0;
var highscore = localStorage.getItem("highscore");
var interval =80;
var increment = 4;
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
//coordinates of food
var fX;
var fY;


var running = false;
var gameOver = false;
var direction = -1; // up = 0, down = -1, left = 1, right = 2
//indentifier of interal
var int;
var score = 0;
//temporary direction (this fixes users pressing keys too quickly and turning into themselves)
var tempdir = direction;

//game should start here.
function run(){
    init();
    //runs gameloop every interval which is interval;
    int = setInterval(gameLoop, interval);
}

//function about will fire the functions to create the arena, the snake, and the fruit.
function init(){
    createMap();
    createSnake();
    createFood();
}


function createMap(){

    document.write("<table>");

    for( var y = 0; y < height; y++){
        document.write("<tr>");
        for( var x = 0; x < width; x++){
            //This if statement identiies the border!
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class='wall' id='"+ x + "-" + y +"'></td>");
            }else{
                //Else statement checks for the inner coordinates, minus the wall;
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
        }
        document.write("</tr>");
    }

    document.write("</table>");

}



function createSnake(){
    set(snakeX, snakeY, "snake");
}

//selector function
function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x,y,value){
    if(x != null && y != null)
        get(x,y).setAttribute("class", value);
}

function rand(min,max){
  //will give us random integer between min and max
    return Math.floor(Math.random() * (max - min) + min);
}

function getType(x,y){
    return get(x,y).getAttribute("class");
}

function createFood(){
    var found = false;
    while(!found && (length < (width-2)*(height-2)+1)){
      //making sure food lands within borders;

        var foodX = rand(1,width-1);
        var foodY = rand(1,height-1);

        if(getType(foodX, foodY) == "blank")
        //will check ig element at this location is a food already
            found = true;
            //will stop search for new spot
    }
    //used to see if snake has gone over the food block;
    set(foodX, foodY, "food");
    fX = foodX;
    fY = foodY;
}


 //Anytime key is pressed we will create function key
window.addEventListener("keypress", function key(event){
    //if key is W set direction up
    var key = event.keyCode;
    if(direction != -1 && (key == 119 || key == 87))
        tempdir = 0;
    //if key is S set direction down
    else if(direction != 0 && (key == 115 || key == 83))
        tempdir = -1;
    //if key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65))
        tempdir = 1;
    //if key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68))
        tempdir = 2;
    //if its not running, then the key is equal to the spacebar. Running is equal to false. Will only pause the game.
    if(!running)
        running = true;
    else if(key == 32)
        running = false;
});
//If the game is running, update, else using the interval id, we can clear it here.
function gameLoop(){
    if(running && !gameOver){
        update();
    }else if(gameOver){
        clearInterval(int);
    }
}


function update(){
    direction = tempdir;
    //prevents fruit from not showing up
    set(fX, fY, "food");
    //update the tail
    updateTail();
    //sets the last segment of the tail to blank  before moving the snake
    set(tailX[length], tailY[length], "blank");
    //updates the position of the snake according to the direction
    if(direction == 0)
        snakeY--;
    else if(direction == -1)
        snakeY++;
    else if(direction == 1)
        snakeX--;
    else if(direction == 2)
        snakeX++;
    //draws the head of the snake on the tail
    set(snakeX, snakeY, "snake");
    //checks for collisions with self
    for(var i = tailX.length-1; i >=0; i--){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            gameOver = true;
            break;
        }
    }
    //checks for collision with wall
    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1)
        gameOver = true;
    //checks for collisions with fruit
    else if(snakeX == fX && snakeY == fY){
        //adds 4 to the score
        score+=4;
        //creates new fruit, which automatically replaces the old one
        createFood();
        //adds the set increment to the length of the snake making it longer
        length+=increment;
    }

    document.getElementById("score").innerHTML =score;
    document.getElementById("highscore").innerHTML = highscore;
    if(highscore !== null){
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
    }
    else{
        localStorage.setItem("highscore", score);
    }


}
function updateTail(){
    for(var i = length; i > 0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();
