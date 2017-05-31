var tela, ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var mapa, pc, imglib;
var vida = 5, lvl = 0, aux = 1, inicio = 1;

function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 800 ;
  tela.height = 480;
  tela.style.border = "5px solid black";
  ctx = tela.getContext('2d');

  imglib = new ImageLoader();    
  imglib.load("elem", "img/struct.png");
    
  pc = new Sprite();
  pc.imageLib = imglib;
  pc.x = 100;
  pc.y = 100;
  pc.color = "#159";  
  pc.dir = 1;

  mapa = new Map(12, 20);
  mapa.imageLib = imglib;

  configuraControles();
  var id = requestAnimationFrame(passo);
}

function passo(){  
  id = requestAnimationFrame(passo);  
  agora = new Date();
  dt = (agora - antes)/1000; 
  ctx.clearRect(0,0, tela.width, tela.height);

  imglib.load("pc", "img/pc"+ (lvl % 4) +".png");  
  imglib.load("im", "img/im"+ (lvl % 4) +".png");  
  
  mapa.alterarLevel(mapa);
  mapa.revelarChave(mapa);
  mapa.gerarVida(mapa);
  mapa.desenhar(ctx);
  mapa.persegue(pc);
  mapa.testarAColisao(pc); 
  mapa.testarAColisaoTiros(mapa);
  pc.moverOnMap(mapa, dt);
  mapa.moverInimigosOnMap(mapa, dt);  
  pc.desenhar(ctx);  
  detalhesGame(id);
    
  antes = agora;
}

function detalhesGame(id){
  var eVida = document.getElementById("EVida");
  eVida.innerText = vida + "♥";

  var eInimigo = document.getElementById("Inimigo");
  eInimigo.innerText = mapa.enemies.length; 

  var eLvl = document.getElementById("nivel");
  eLvl.innerText = lvl;

  var eChv = document.getElementById("chv");
  eChv.innerText = mapa.chave;

  if(vida == 0){ 
    cancelAnimationFrame(id);
    mapa.cont = 0; 

    var txt = "Tente de novo!";
    var txt2 = "Enter &";
    var txt3 = "Reinicie!";
    
    ctx.fillStyle = "black"; 
    ctx.globalAlpha = 0.8;  
    ctx.fillRect(0, 0, tela.width, tela.height);                    
    ctx.font = "100px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(txt, 80, 100);
    ctx.fillText(txt2, 170, 275);
    ctx.fillText(txt3, 260, 450);            
  } 

  if(lvl == 0 && inicio == 1){
    cancelAnimationFrame(id);
    
    var txt = "Welcome to the Game! ";
    var txt2 = "Comandos: "
    var txt3 = "Movimentos     Pausa    Atirar    Iniciar";

    var txt4 = "◙ Ao atingir cinco inimigos, revela a chave";
    var txt5 = "◙ Use a chave para desbloquear a porta";
    var txt6 = "◙ Nível máximo: 12";
    var txt7 = "[w]               [↑]";
    var txt8 = "[A] [S] [D]   [←] [↓] [→]      [P]       [Space]    [Enter]";
    
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, tela.width, tela.height);                    
    ctx.font = "60px Arial";
    ctx.fillStyle = "darkRed";
    ctx.fillText(txt, 95, 100);

    ctx.font = "25px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText(txt7, 165,260);
    ctx.fillText(txt8, 127, 290);    

    ctx.font = "30px Arial";
    ctx.fillStyle = "#000";
    ctx.fillText(txt2, 100, 160);
    ctx.fillText(txt3, 180, 205);
    ctx.fillText(txt4, 100, 375);
    ctx.fillText(txt5, 100, 405);
    ctx.fillText(txt6, 100, 435);       
  }

  if(lvl == 13 && inicio == 2){
    cancelAnimationFrame(id);
    lvl = 0;
    inicio = 1;
    
    var txt = "Nível Máximo!";
    var txt2 = "Tecle Enter";
    var txt3 = "E Reinicie!";
    
    ctx.fillStyle = "darkRed";
    ctx.fillRect(0, 0, tela.width, tela.height);                    
    ctx.font = "100px Arial";
    ctx.fillStyle = "#FFD700";
    ctx.fillText(txt, 60, 100);
    ctx.fillText(txt2, 190, 275);
    ctx.fillText(txt3, 280, 450);    
  }
}

function configuraControles(){
  addEventListener("keydown", function(e){
    switch (e.keyCode) {
      case 65:
      case 37:
          pc.vx = -100;
          pc.pose = 2;
          pc.dir = 1;
          e.preventDefault();
        break;
      case 38:
      case 87:
          if(pc.vy === 0){
            pc.vy -= 200;
          }
          pc.pose = 3;
          pc.dir = 2;
          e.preventDefault();
        break;
      case 39:
      case 68:
          pc.vx = +100;
          pc.pose = 0;
          pc.dir = 3;
          e.preventDefault();
        break;
      case 40:
      case 83:
          pc.vy = +100;
          pc.pose = 1;
          pc.dir = 4
          e.preventDefault();
        break;
      case 80:
        if(aux == 1 && inicio == 2){
          var txt = "Pausa ►! ";
          var txt2 = "Para ☻";
          var txt3 = "Café!";
          
          ctx.fillStyle = "#9AC0CD";
          ctx.globalAlpha = 0.8;
          ctx.fillRect(0, 0, tela.width, tela.height);                    
          ctx.font = "100px Arial";
          ctx.fillStyle = "darkRed";

          ctx.fillText(txt, 180, 100);
          ctx.fillText(txt2, 270, 275);
          ctx.fillText(txt3, 360, 450);

          cancelAnimationFrame(id);                    
          aux = 2;
        }
        else if(aux == 2){ 
          ctx.globalAlpha = 1;                   
          antes = new Date();                      
          requestAnimationFrame(passo);          
          aux = 1;            
        }
      break;
      case 13:
          if(vida == 0 || (lvl == 0 && inicio == 1)){
            vida = 5;
            lvl = 0;
            inicio = 2;
            aux = 1;
            antes = new Date();                      
            requestAnimationFrame(passo);
            ctx.globalAlpha = 1;
            mapa.enemies.length = 0;
            mapa.loadMap([
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,0,0,0,1,0,9,0,0,1,0,0,1,0,0,0,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,1,0,0,0,9,0,0,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,0,9,0,0,0,0,0,0,0,1],
              [1,0,0,0,9,0,0,0,1,0,1,0,0,0,0,0,0,9,0,1],
              [1,3,0,0,0,0,6,1,1,0,1,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,1,1,1,2,1,1,1,1,1,1,0,0,0,1],
              [1,1,0,0,0,0,9,0,0,0,0,0,9,0,0,0,0,9,0,1],
              [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1],
              [1,0,9,0,0,0,0,0,0,0,0,9,0,0,0,0,0,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]);            
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
          pc.pose = 6;
          pc.vx = 0;
          e.preventDefault();
        break;
      case 68:
      case 39:
          pc.pose = 4;
          pc.vx = 0;
          e.preventDefault();        
        break;
      case 38:
      case 87:
          pc.pose = 7;
          e.preventDefault();
        break;
      case 40:
      case 83:
          pc.pose = 5;         
          e.preventDefault();
        break;
      default:
    }
  });
}