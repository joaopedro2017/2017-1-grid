function Map(l, c) {
  this.SIZE = 40;
  this.cells = [];
  this.enemies = [];
  this.tiros = [];

  for (var i = 0; i < l; i++) {
    this.cells[i] = [];
    for (var j = 0; j < c; j++) {
      this.cells[i][j] = 0;
    }
  }
}

Map.prototype.desenhar = function(ctx) {
  for (var i = 0; i < this.cells.length; i++) {
    var linha = this.cells[i];
    for (var j = 0; j < linha.length; j++) {
      switch (this.cells[i][j]) {
        case 0:
          break;
        case 1:
          ctx.fillStyle = 'brown';
          ctx.strokeStyle = 'chocolate';
          ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          ctx.lineWidth = 3;
          ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
          break;
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

Map.prototype.tiro = function(x, y, dir){
  var tiro = new Sprite();
  tiro.x = x;
  tiro.y = y;
  tiro.color = "gold";
  switch (dir){
    case 1:
      tiro.vx = -200;
    break;
    case 2:
      tiro.vy = -200;
    break;
    case 3:
      tiro.vx = +200;
    break;
    case 4:
      tiro.vy = +200;
    break
  }
  this.tiros.push(tiro);
}

Map.prototype.loadMap = function(map) {
  for (var i = 0; i < this.cells.length; i++) {
    for (var j = 0; j < this.cells[i].length; j++) {
      switch (map[i][j]) {
        case 0:
        case 1:
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

Map.prototype.getIndices = function (sprite) {
   var pos = {};
   pos.c = Math.floor(sprite.x/this.SIZE);
   pos.l = Math.floor(sprite.y/this.SIZE);
   return pos;
};


Map.prototype.criaInimigo = function (l,c) {
  var inimigo = new Sprite();
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

Map.prototype.desenharTiros = function(ctx) {
  for (var i = 0; i < this.tiros.length; i++) {
    this.tiros[i].desenhar(ctx);
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

Map.prototype.moverInimigosOnMap = function(map, dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].moverOnMap(map,dt);
  }
}

Map.prototype.persegue = function(alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].persegue(alvo);
  }
}
