window.onload = function() {
  var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    score = 0;
    level = 0;
    direction = 0
    snake = new Array(3)

  var map = new Array(20);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(20);
  }

  canvas.width = 204;
  canvas.height = 224;



  var body = document.querySelector('body');
  body.appendChild(canvas);
  map = generateSnake(map);
  map = generateFood(map);
  drawGame();

function drawGame() {

  //Clear  canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw border and score
  drawMain();

  //Start cycling the matrix
  for (var x = 0; x < map.length; x++) {
    for(var y = 0; y < map[0].length; y++) {
      if (map[x][y] === 1) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
      } else if (map[x][y] === 2) {
          ctx.fillStyle = 'orange';
          ctx.fillRect(x * 10, y * 10 + 20, 10,10)
      }
    }
  }
}
  function drawMain() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';

    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

    ctx.font = '14px sans-sariff';
    ctx.fillText('Score: ' + score +' Level: ' + level, 2, 12);
  }

  function generateFood(map) {
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);
    while (map[rndX][rndY] === 2) {
      rndX = Math.round(Math.random() * 19);
      rndY = Math.round(Math.random() * 19);
       }

       map[rndX][rndY] = 1;
       return map;

  }

  function generateSnake(map) {
    var rndX = Math.round(Math.random() * 19),
        rndY = Math.round(Math.random() * 19);
    while ((rndX - snake.length) < 0) {
        rndX = Math.round(Math.random() * 19);
      }
      for (var i = 0; i < snake.length; i++) {
        snake[i] = {x: rndX - i, y: rndY };
        map[rndX - i][rndY] = 2;
      }
      return map;
  }

};
