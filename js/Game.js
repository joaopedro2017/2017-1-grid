var tela, ctx;
var antes = new Date();
var agora = new Date();
var dt = 0;
var mapa, pc, imglib;
var weap = 0; vida = 5, lvl = 0, aux = 1, inicio = 1, pers = 0, esc = 1;

function init(){
  tela = document.getElementsByTagName('canvas')[0];
  tela.width = 800 ;
  tela.height = 480;
  tela.style.border = "5px solid black";
  ctx = tela.getContext('2d');

  imglib = new ImageLoader();    
  imglib.load("elem", "img/struct.png");
  imglib.load("personagem", "img/pers.png");
  imglib.load("en0", "img/en0.png");
  imglib.load("en1", "img/en1.png");
  imglib.load("en2", "img/en2.png");
  imglib.load("en3", "img/en3.png");
  imglib.load("en4", "img/en4.png");
  imglib.load("en5", "img/en5.png");
  imglib.load("en6", "img/en6.png");

  soundLib = new SoundLoader();
  soundLib.load("punch", "sound/punch.mp3");
  soundLib.load("pulo", "sound/pulo.mp3");
  soundLib.load("flecha", "sound/arrow.mp3");
  soundLib.load("fogo", "sound/fogo.mp3");
  soundLib.load("ninja", "sound/ninja.mp3");
  soundLib.load("porta", "sound/porta.mp3");
  soundLib.load("perdeu", "sound/vcPerdeu.mp3");
  soundLib.load("contato", "sound/contato.mp3");
  soundLib.load("chave", "sound/chave.mp3");
    
  pc = new Sprite();
  pc.imageLib = imglib;
  pc.x = 100;
  pc.y = 100;
  pc.color = "#159";  
  pc.dir = 3;

  mapa = new Map(12, 20);
  mapa.imageLib = imglib;

  configuraControles();
  var id = requestAnimationFrame(passo);
}

function passo(){
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, tela.width, tela.height);
  
  id = requestAnimationFrame(passo);  
  agora = new Date();
  dt = (agora - antes)/1000;   

  imglib.load("fc" + weap +"", "img/arma"+ weap +".png");
  imglib.load("pc", "img/pc"+ pers +".png"); 

  if(inicio == 2){

    if(esc == 1.5 || esc == 2){
      ctx.scale(esc, esc);
      ctx.translate((Math.min(tela.width/4-pc.x, 0)),Math.min(tela.height/4-pc.y,0));
    }    

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
  }
  
  detalhesGame(id);
    
  antes = agora;
  ctx.restore();
}

function detalhesGame(id){
  var eVida = document.getElementById("EVida");
  eVida.innerText = vida + "♥";

  var eInimigo = document.getElementById("Inimigo");
  eInimigo.innerText = mapa.enemies.length; 

  var eLvl = document.getElementById("nivel");
  eLvl.innerText = lvl;

  var eArma = document.getElementById("arma");
  if(weap == 0) eArma.innerText = "Arco e Flecha";
  else if(weap == 4) eArma.innerText = "Fogo";
  else if(weap == 8) eArma.innerText = "Shuriken";

  var eChv = document.getElementById("chv");
  eChv.innerText = mapa.chave;

  if(vida == 0 && inicio != 3){    
    mapa.cont = 0;
    inicio = 3;
    soundLib.play("perdeu");
  }

  if(vida == 0){
    var telaPerdeu = new Image();
    telaPerdeu.src = "img/telaPerder.png";
    ctx.drawImage(telaPerdeu, 0, 0, 800, 480);    
  } 

  if(lvl == 0 && inicio == 1){
    var telaInic = new Image();
    telaInic.src = "img/telaInicial.png";
    ctx.drawImage(telaInic, 0, 0, 800, 480); 

    imglib.drawImageTile(ctx, "personagem", 0, pers, 128, 336, 200);        
  }

  if(lvl >= 13){
    mapa.enemies.length = 0;    
    inicio = 4;

    var telaLvlMax = new Image();
    telaLvlMax.src = "img/telaLevelMax.png";
    ctx.drawImage(telaLvlMax, 0, 0, 800, 480);
  }

  if(aux == 4 && lvl > 0 && lvl <= 12){
    var telaLvlUp = new Image();
    telaLvlUp.src = "img/telaLevelUp.png";
    ctx.drawImage(telaLvlUp, 0, 0, 800, 480);

    ctx.font = "50px Elephant";
    ctx.fillStyle = "black";
    if(lvl < 10) ctx.fillText(lvl, 410, 260);
    else ctx.fillText(lvl, 400, 260);

    inicio = 5;
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
          if(pc.vy == 0){
            pc.vy -= 200;
            soundLib.play("pulo");
          }
          if(pc.vx < 0) pc.pose = 2;
          else if(pc.vx >= 0) pc.pose = 0;
          
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
      case 69:
          if(esc == 1) esc = 1.5;
          else if(esc == 1.5) esc = 2;
          else if(esc == 2) esc = 1;
        break;
      case 40:
      case 83:
          pc.vy = +100;
          if(pc.vx < 0) pc.pose = 2;
          else if(pc.vx >= 0) pc.pose = 0;
          
          pc.dir = 4
          e.preventDefault();
        break;
      case 80:
        if(aux == 1 && inicio == 2){
          var txt = "Pausa ►! ";
          var txt2 = "Para ☻";
          var txt3 = "Café!";
          
          ctx.fillStyle = "#9AC0CD";
          ctx.globalAlpha = 0.75;
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
      case 81:
        if(weap == 0){
          weap = 4;
        }else if(weap == 4){
          weap = 8;          
        }else if(weap == 8){
          weap = 0;
        }
      break;
      case 82:
        if(inicio == 1){
          if(pers == 0) pers++;
          else if(pers == 1) pers++;
          else if(pers == 2) pers++;
          else if(pers == 3) pers++;
          else if(pers == 4) pers++;
          else if(pers == 5) pers = 0;
        }
      break;
      case 13:
          if(lvl == 0 && inicio == 1){            
            inicio = 2;
            mapa.enemies.length = 0;
            mapa.loadMap([
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,0,0,0,1,0,9,0,0,1,0,0,1,0,0,0,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,1,0,0,0,9,0,0,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,0,9,0,0,0,0,0,0,0,1],
              [1,0,0,0,9,0,0,0,1,0,1,0,0,0,0,0,0,9,0,1],
              [1,3,0,0,0,0,6,1,1,2,1,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1],
              [1,1,0,0,0,0,9,0,0,0,0,0,9,0,0,0,0,9,0,1],
              [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,1],
              [1,0,9,0,0,0,0,0,0,0,0,9,0,0,0,0,0,1,1,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]);            
          }
          else if((vida == 0 && inicio == 3) || inicio == 4){
            lvl = 0;
            inicio = 1;
            vida = 5;
          }else if(aux == 4){
            inicio = 2;
            aux = 1;
          }
      break;
      case 32:
          mapa.tiro(ctx, pc.x, pc.y, pc.dir);                   
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
          if(pc.vx < 0) pc.pose = 6;
          else if(pc.vx >= 0) pc.pose = 4;          
          e.preventDefault();
        break;
      case 40:
      case 83:          
          if(pc.vx < 0) pc.pose = 6;
          else if(pc.vx >= 0) pc.pose = 4;        
          e.preventDefault();
        break;
      default:
    }
  });
}