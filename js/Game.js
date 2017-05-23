var tela, ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var mapa, pc;
var vida = 5, lvl = 0, aux = 1;

function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 600;
  tela.height = 480;
  ctx = tela.getContext('2d');
  mapa = new Map(12, 15);
  
  mapa.loadMap([
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,0,0,0,1,0,9,0,1,0,0,0,0,0,1],
      [1,0,0,0,1,0,0,0,1,0,0,0,9,0,1],
      [1,0,0,0,1,0,0,0,0,0,9,0,0,0,1],
      [1,0,0,0,9,0,0,0,1,0,1,3,0,0,1],
      [1,0,0,0,0,0,0,1,1,2,1,1,0,0,1],
      [1,0,0,0,0,1,1,1,1,1,1,1,1,0,1],
      [1,3,0,0,0,0,9,0,0,0,0,0,9,0,1],
      [1,1,1,1,0,0,0,0,0,0,0,0,0,0,1],
      [1,0,0,0,0,1,1,1,1,0,0,0,1,0,1],
      [1,0,9,0,0,0,0,0,0,0,0,9,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ]);    
  
  pc = new Sprite();
  pc.x = 50;
  pc.y = 50;
  pc.color = "#159";  
  pc.dir = 1;
  configuraControles();

  var id = requestAnimationFrame(passo);
}

function passo(){  
  id = requestAnimationFrame(passo);  
  agora = new Date();
  dt = (agora - antes)/1000;
  
  detalhesGame(id);
  ctx.clearRect(0,0, tela.width, tela.height);  

  mapa.alterarLevel(mapa);
  mapa.desenhar(ctx);  
  mapa.persegue(pc);
  mapa.testarAColisao(pc); 
  mapa.testarAColisaoTiros(mapa);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);  
  pc.desenhar(ctx);  
  antes = agora;
}

function detalhesGame(id){
  var eVida = document.getElementById("EVida");
  eVida.innerText = vida;

  var eInimigo = document.getElementById("Inimigo");
  eInimigo.innerText = mapa.enemies.length; 

  var eLvl = document.getElementById("nivel");
  eLvl.innerText = lvl;

  if(vida == 0){    
    cancelAnimationFrame(id);
  }
}

function configuraControles(){
  addEventListener("keydown", function(e){
    switch (e.keyCode) {
      case 65:
      case 37:
          pc.vx = -100;
          pc.dir = 1;
          e.preventDefault();
        break;
      case 38:
      case 87:
          if(pc.vy === 0){
            pc.vy -= 200;
          }
          pc.dir = 2;
          e.preventDefault();
        break;
      case 39:
      case 68:
          pc.vx = +100;
          pc.dir = 3;
          e.preventDefault();
        break;
      case 40:
      case 83:
          pc.vy = +100;
          pc.dir = 4
          e.preventDefault();
        break;
      case 80:
        if(aux == 1){
          var txt = "Pausa";
          var txt2 = "Para Ø";
          var txt3 = "Café!";
          //ctx.clearRect(0,0, tela.width, tela.height);
          ctx.fillStyle = "#9AC0CD";
          ctx.fillRect(75, 75, 450, 330);
          ctx.font = "100px Arial";
          ctx.fillStyle = "black";

          ctx.fillText(txt, 80, 175);
          ctx.fillText(txt2, 130, 275);
          ctx.fillText(txt3, 180, 375);

          cancelAnimationFrame(id);                    
          aux = 2;
        }
        else if(aux == 2){                    
          antes = new Date();                      
          requestAnimationFrame(passo);          
          aux = 1;            
        }
      break;
      case 13:
          if(vida == 0){
            vida = 5;
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
      case 65:
      case 68:
      case 39:
          pc.vx = 0;
          e.preventDefault();
        break;
      case 38:
      case 87:
      case 40:
      case 83:
          pc.vy = 0;
          e.preventDefault();
        break;
      default:
    }
  });
}