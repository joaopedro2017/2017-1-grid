var tela;
var ctx;
var antes = 0;
var dt;
var mapa;
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
  passo();
}

function passo(t){
  dt = t - antes;
  requestAnimationFrame(passo);
  mapa.desenhar(ctx);
  antes = t;
}
