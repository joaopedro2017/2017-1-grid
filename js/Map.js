function Map(l, c) {
  this.SIZE = 40;
  this.cells = [];
  this.enemies = [];
  this.tiros = [];
  this.cont = 0;
  this.chave = 0;
  this.x = 0;
  this.y = 100;

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}

Map.prototype.desenhar = function(ctx){
  this.desenharLimites(ctx);
  this.desenharTiles(ctx);
}

Map.prototype.desenharLimites = function(ctx) {
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 0:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7: 
          break;
        case 1:
          if((lvl % 4) == 0){
            ctx.fillStyle = 'wheat';
          } else if((lvl % 4) == 1){
            ctx.fillStyle = 'burlywood'
          } else if((lvl % 4) == 2){
            ctx.fillStyle = 'sienna'
          } else if((lvl % 4) == 3){
            ctx.fillStyle = 'seaGreen'
          }
          ctx.strokeStyle = 'chocolate';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
        /*case 4:          
          ctx.fillStyle = 'goldenrod';
          ctx.strokeStyle = 'chocolate';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);        
          break;*/        
        /*case 5:
          ctx.fillStyle = 'yellow';
          ctx.strokeStyle = 'chocolate';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;*/
        default:
          ctx.fillStyle = 'red';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
  this.desenharInimigos(ctx);
  this.desenharTiros(ctx);
  this.moverTiros(dt);
};

Map.prototype.desenharTiles = function(ctx) {
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 0:
        case 3:
        case 6:
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE); //desenha o chao coluna 4
          break;
        case 1:
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE);
          this.imageLib.drawImageTile(ctx, "elem", 0, 5, 40, j*this.SIZE, i*this.SIZE); // desenha estrutura coluna 5
          break;
        case 2:
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE); 
          this.imageLib.drawImageTile(ctx, "elem", 0, 0, 40, j*this.SIZE, i*this.SIZE); // desenha porta fechada coluna 0
          break;
        case 4:
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE);
          this.imageLib.drawImageTile(ctx, "elem", 0, 1, 40, j*this.SIZE, i*this.SIZE); // desenha porta aberta coluna 1
          break;
        case 5:
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE);
          this.imageLib.drawImageTile(ctx, "elem", 0, 2, 40, j*this.SIZE, i*this.SIZE); // desenha chave coluna 2
          break;
        case 7: 
          this.imageLib.drawImageTile(ctx, "elem", 0, 4, 40, j*this.SIZE, i*this.SIZE);
          this.imageLib.drawImageTile(ctx, "elem", 0, 3, 40, j*this.SIZE, i*this.SIZE); // desenha vida coluna 3
          break;
        default:
      }
    }
  }
  this.desenharInimigos(ctx);
  this.desenharTiros(ctx);
  this.moverTiros(dt);
};

Map.prototype.loadMap = function(map) {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
     switch (map[i][j]) {
        case 0:
        case 1:
        case 2:
        case 4:
        case 5:
        case 3:
        case 6:
        case 7:        
          this.cells[i][j] = map[i][j];
          break;                         
        case 9:
          this.cells[i][j] = 0;          
          this.criaInimigo(i,j);
        break;
        default:
      }
    }
  }
};

Map.prototype.revelarChave = function(map){
  if(this.cont >= 5){
    for (var i = 0; i < this.cells.length; i++) {
      var linha = this.cells[i];
      for (var j = 0; j < linha.length; j++) {
        switch (this.cells[i][j]) {
          case 3:
            this.cells[i][j] = 5;
          break;
        }
      }
    }
  }
  if (map.cells[Math.floor(pc.y/40)][Math.floor(pc.x/40)] == 5){
    for (var i = 0; i < this.cells.length; i++) {
      var linha = this.cells[i];
      for (var j = 0; j < linha.length; j++) {
        switch (this.cells[i][j]) {
          case 5:
            this.cells[i][j] = 0;
          break
        }
      }
    }
    this.chave = 1;
  }  
}

Map.prototype.gerarVida = function(map){
  if(vida <= 3){
    for (var i = 0; i < this.cells.length; i++) {
      var linha = this.cells[i];
      for (var j = 0; j < linha.length; j++) {
        switch (this.cells[i][j]) {
          case 6:
            this.cells[i][j] = 7;
          break;
        }
      }
    }
  }
  if (map.cells[Math.floor(pc.y/40)][Math.floor(pc.x/40)] == 7){
    for (var i = 0; i < this.cells.length; i++) {
      var linha = this.cells[i];
      for (var j = 0; j < linha.length; j++) {
        switch (this.cells[i][j]) {
          case 7:
            this.cells[i][j] = 0;
          break
        }
      }
    }
    vida+=5;    
  }  
}

Map.prototype.tiro = function(x, y, dir){
  var tiro = new Sprite();
  tiro.x = x;
  tiro.y = y;
  tiro.SIZE = 7;
  tiro.color = "yellow";
  switch (dir){
    case 1:
      tiro.vx = -150;
    break;
    case 2:
      tiro.vy = -150;
    break;
    case 3:
      tiro.vx = +150;
    break;
    case 4:
      tiro.vy = +150;
    break
  }
  this.tiros.push(tiro);
}

Map.prototype.getIndices = function (sprite) {
   var pos = {};
   pos.c = Math.floor(sprite.x/this.SIZE);
   pos.l = Math.floor(sprite.y/this.SIZE);
   return pos;
};

Map.prototype.criaInimigo = function (l,c) {
  var inimigo = new Sprite();
  inimigo.imageLib = this.imageLib;
  inimigo.poses = [
    {key: "im", row: 11, col: 0, colMax: 7, time: 8},
    {key: "im", row: 10, col: 0, colMax: 7, time: 8},
    {key: "im", row:  9, col: 0, colMax: 7, time: 8},
    {key: "im", row:  8, col: 0, colMax: 7, time: 8},
    {key: "im", row: 11, col: 0, colMax: 0, time: 8},
    {key: "im", row: 10, col: 0, colMax: 0, time: 8},
    {key: "im", row:  9, col: 0, colMax: 0, time: 8},
    {key: "im", row:  8, col: 0, colMax: 0, time: 8},
  ];

  inimigo.x = (c+0.5)*this.SIZE;
  inimigo.y = (l+0.5)*this.SIZE;
  this.enemies.push(inimigo);
};

Map.prototype.desenharInimigos = function(ctx) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].desenhar(ctx);    
  }  
}

Map.prototype.moverInimigos = function(dt) {
  for (var i = 0; i < this.enemies.length; i++) {    
    this.enemies[i].mover(dt);
  }  
}

Map.prototype.moverInimigosOnMap = function(map, dt) {
  for (var i = 0; i < this.enemies.length; i++) {    
    this.enemies[i].moverOnMap(map,dt);    
  }
}

Map.prototype.desenharTiros = function(ctx) {
  for (var i = 0; i < this.tiros.length; i++) {
    this.tiros[i].desenharLimites(ctx);
  }    
}

Map.prototype.moverTiros = function(dt) {
  for (var i = 0; i < this.tiros.length; i++) {
    this.tiros[i].mover(dt);
  }
}

Map.prototype.moverTirosOnMap = function(map, dt) {
  for (var i = 0; i < this.tiros.length; i++) {
    this.tiros[i].moverOnMap(map,dt);
  }
}

Map.prototype.persegue = function(alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].persegue(alvo);
  }
}

Map.prototype.testarAColisao = function(alvo){
  for (var i = 0; i < this.enemies.length; i++) {
    if(alvo.colidirCom(this.enemies[i])){
      this.enemies[i].destroyed = true;
      this.enemies.splice(i,1);
      alvo.x = 100;
      alvo.y = 100;
      vida--;
    }
  }
}

Map.prototype.testarAColisaoTiros = function(map){
  for (var i = this.enemies.length-1; i >= 0; i--) {
    for (var j = this.tiros.length-1; j>=0; j--) {
      if(this.tiros[j].colidirCom(this.enemies[i])){
        this.cont++;       
        this.enemies[i].destroyed = true;        
        this.enemies.splice(i,1);
        this.tiros[j].destroyed = true;
        this.tiros.splice(j,1);
        break;      
      }
    }
  }
  for (var j = this.tiros.length-1; j>=0; j--) {
    if (map.cells[Math.floor(this.tiros[j].y/40)][Math.floor(this.tiros[j].x/40)] == 1){
      this.tiros[j].destroyed = true;
      this.tiros.splice(j, 1);      
    }
  }
}

Map.prototype.alterarLevel = function(map){
  if(this.chave == 1){
    for (var i = 0; i < this.cells.length; i++) {
      var linha = this.cells[i];
      for (var j = 0; j < linha.length; j++) {
        switch (this.cells[i][j]) {
          case 2:
            this.cells[i][j] = 4;
          break
        }
      }
    }
  }
  if (map.cells[Math.floor(pc.y/40)][Math.floor(pc.x/40)] == 4){    
    lvl = lvl + 1;
    this.chave = 0;
    this.cont = 0;
    this.enemies.length = 0;

    if ((lvl % 4) == 0){
      casasMapa=([
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
    } else if ((lvl % 4) == 1){
      casasMapa=([
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,0,9,0,1,1,1,0,1,1,0,9,2,1],
        [1,0,0,0,0,1,1,0,0,0,1,1,0,0,9,0,0,1,1,1],
        [1,3,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,9,6,9,0,0,1,1,0,0,1],
        [1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,9,1],
        [1,9,9,0,0,0,0,0,9,0,1,1,1,1,1,0,0,0,1,1],
        [1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,9,0,0,0,0,0,0,1,1,1,1,0,0,0,1],
        [1,0,9,0,0,1,1,0,9,1,0,0,0,0,0,0,0,1,1,1],
        [1,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]);      
    } else if ((lvl % 4) == 2){
      casasMapa=([
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,1,1,0,0,9,0,0,9,0,0,1,0,0,6,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],
        [1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,9,0,9,0,1],
        [1,1,1,1,0,1,0,0,0,0,1,0,0,0,1,1,1,0,0,1],
        [1,0,0,0,0,1,9,0,0,1,1,1,0,0,0,0,1,0,0,1],
        [1,2,9,0,0,1,0,9,1,1,1,1,1,0,0,1,1,1,1,1],
        [1,0,0,0,0,1,0,0,1,0,0,0,0,9,0,0,0,9,0,1],
        [1,1,1,1,0,0,9,1,1,0,0,0,0,1,0,0,0,0,0,1],
        [1,9,0,0,9,1,1,1,1,9,0,0,0,1,1,1,1,3,1,1],
        [1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,9,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]);      
    } else if ((lvl % 4) == 3){
      casasMapa=([
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,1,0,0,0,0,0,0,0,0,0,9,9,0,0,9,0,1],
        [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,9,1],
        [1,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
        [1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,9,6,0,1],
        [1,0,0,1,2,1,0,0,0,0,1,0,9,0,9,1,0,1,3,1],
        [1,0,1,1,1,1,0,0,9,0,0,0,0,0,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,0,0,0,0,0,0,0,9,0,1,0,0,0,9,9,1],
        [1,0,1,1,1,0,0,1,9,0,0,1,0,1,0,9,0,1,0,1],
        [1,9,1,1,1,9,0,0,0,0,0,0,9,0,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ]);      
    }
    mapa.loadMap(casasMapa);
    pc.x = 100;
    pc.y = 100;
  }
}