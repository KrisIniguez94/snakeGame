window.onload = function() {
  var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    score = 0;
    level = 0;
  canvas.width = 204;
  canvas.height = 224;

  var body = document.querySelector('body');
  body.appendChild(canvas);

  drawGame();

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMain();
  }

  function drawMain() {
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'green';

    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

    ctx.font = '12px sans sariff';
    ctx.fillText('Score: ' + score +'- Level: ' + level, 2, 12);
  }

};
