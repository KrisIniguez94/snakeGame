window.onload = function() {
  var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    score = 0;
    level = 0;
    direction = 0

  var map = new Array(20);
  for (var i = 0; i < map.length; i++) {
    map[i] = new Array(20);
  }

  canvas.width = 204;
  canvas.height = 224;



  var body = document.querySelector('body');
  body.appendChild(canvas);

  map = generateFood(map);
  drawGame();

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
  }

  function drawMain() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';

    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

    ctx.font = '14px sans-sariff';
    ctx.fillText('Score: ' + score +' Level: ' + level, 2, 12);
  }

  function generateFood(map) {
    var rndX = Math.round(Math.random() * 19)
     rndY = Math.round(Math.random() * 19)
    while (map[rndX][rndY] === 2) {
      rndX = Math.round(Math.random() * 19);
      rndY = Math.round(Math.random() * 19);
       }

       map[rndX][rndY] = 1;
       return map;


  }

};
