var tela;
var ctx;
var antes = 0;
var dt = 0;
var mapa;
var pc;
function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 600;
  tela.height = 480;
  ctx = tela.getContext('2d');
  mapa = new Map(12, 15);
  mapa.loadMap([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,1,0,1,1,0,0,1],
    [1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,1,1,1,1,0,0,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;
  pc.vx = 20;


  requestAnimationFrame(passo);
}

function passo(t){
  dt = (t - antes)/1000;
  requestAnimationFrame(passo);
  pc.mover(dt);
  mapa.desenhar(ctx);
  pc.desenhar(ctx);
  antes = t;
}
