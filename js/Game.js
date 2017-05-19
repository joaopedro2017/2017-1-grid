var tela;
var ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var mapa;
var pc;
var vida;
var aux;

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
  pc.color = "blue";  
  pc.dir = 1;
  configuraControles();
  vida = 5;
  aux = 1; 

  var id = requestAnimationFrame(passo);
}

function passo(){
  id = requestAnimationFrame(passo);
  agora = new Date();
  dt = (agora - antes)/1000;

  ctx.clearRect(0,0, tela.width, tela.height); 
  detalhesGame(vida, mapa);

  mapa.persegue(pc);
  mapa.testarAColisao(pc); 
  mapa.testarAColisaoTiros(mapa);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);
  mapa.desenhar(ctx);
  pc.desenhar(ctx);
  antes = agora;
}

function detalhesGame(vida, mapa){
  var eVida = document.getElementById("EVida");
  eVida.innerText = vida;

  var eInimigo = document.getElementById("Inimigo");
  eInimigo.innerText = mapa.enemies.length;
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
          if(pc.vy === 0){
            pc.vy -= 200;
          }
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
        case 80:
          if(aux == 1){
            cancelAnimationFrame(id);           
            aux = 2;
          }
          else if(aux == 2){
            antes = new Date();                      
            requestAnimationFrame(passo);
            aux = 1;            
          }
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