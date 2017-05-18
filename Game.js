var tela;
var ctx;
var antes = 0;
var dt = 0;
var mapa;
var pc;
var vida;

function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 600;
  tela.height = 480;
  ctx = tela.getContext('2d');
  mapa = new Map(12, 15);
  mapa.loadMap([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,9,1,0,0,0,0,9,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,9,1,0,0,0,0,0,9,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,9,0,0,0,0,0,9,0,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,0,0,0,1,1,1],
    [1,0,9,0,0,0,0,0,0,0,0,9,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;  
  pc.dir = 1;
  configuraControles();
  vida = 5;    

  requestAnimationFrame(passo);
}

function passo(t){
  dt = (t - antes)/1000;
  ctx.clearRect(0,0, tela.width, tela.height);
  requestAnimationFrame(passo);
  mapa.persegue(pc);
  mapa.testarAColisao(pc);

  var eVida = document.getElementById("EVida");
  eVida.innerText = vida;

  var eInimigo = document.getElementById("Inimigo");
  eInimigo.innerText = mapa.enemies.length;

  mapa.testarAColisaoTiros(mapa);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);
  mapa.desenhar(ctx);
  pc.desenhar(ctx);
  antes = t;
}

function configuraControles(){
  addEventListener("keydown", function(e){
    switch (e.keyCode) {
      case 37:
          pc.vx = -100;
          pc.dir = 1;
          e.preventDefault();
        break;
      case 38:
          pc.vy = -100;
          pc.dir = 2;
          e.preventDefault();
        break;
      case 39:
          pc.vx = +100;
          pc.dir = 3;
          e.preventDefault();
        break;
      case 40:
          pc.vy = +100;
          pc.dir = 4
          e.preventDefault();
        break;
      case 32:
          mapa.tiro(pc.x, pc.y, pc.dir);
      default:
    }
  });
  addEventListener("keyup", function(e){
    switch (e.keyCode) {
      case 37:
      case 39:
          pc.vx = 0;
          e.preventDefault();
        break;
      case 38:
      case 40:
          pc.vy = 0;
          e.preventDefault();
        break;
      default:
    }
  });
}