function Sprite() {
  this.x = 0;
  this.y = 0;
  this.tamx = 32;
  this.tamy = 53;
  this.vx = 0;
  this.vy = 0;
  this.SIZE = 20;
  this.imageLib;
  this.pose = 0;
  this.frame = 0;
  this.tiro = 0;
  this.poses = [
    {key: "pc", row: 11, col: 0, colMax: 7, time: 8},
    {key: "pc", row: 10, col: 0, colMax: 7, time: 8},
    {key: "pc", row:  9, col: 0, colMax: 7, time: 8},
    {key: "pc", row:  8, col: 0, colMax: 7, time: 8},

    {key: "pc", row: 11, col: 0, colMax: 0, time: 8},
    {key: "pc", row: 10, col: 0, colMax: 0, time: 8},
    {key: "pc", row:  9, col: 0, colMax: 0, time: 8},
    {key: "pc", row:  8, col: 0, colMax: 0, time: 8},

    {key: "pc", row: 19, col: 2, colMax: 12, time: 12},
    {key: "pc", row: 18, col: 2, colMax: 12, time: 12},
    {key: "pc", row: 17, col: 2, colMax: 12, time: 12},
    {key: "pc", row: 16, col: 2, colMax: 12, time: 12},

    {key: "pc", row: 19, col: 2, colMax: 0, time: 8},
    {key: "pc", row: 18, col: 2, colMax: 0, time: 8},
    {key: "pc", row: 17, col: 2, colMax: 0, time: 8},
    {key: "pc", row: 16, col: 2, colMax: 0, time: 8},

  ];
  this.color = "black";   
}

Sprite.prototype.desenhar = function(ctx) {
  this.desenharPose(ctx);
  if(this.debug) this.desenharLimites(ctx);
}

Sprite.prototype.desenharPose = function(ctx) {
  
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.4;
  ctx.beginPath();
  ctx.arc(this.x, this.y+3, this.SIZE/2, 0, 2*Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;

  this.imageLib.drawImageTile(ctx,
    this.poses[this.pose].key,
    this.poses[this.pose].row,
    this.poses[this.pose].col + Math.floor(this.frame),
    64,
    this.x - this.tamx, this.y - this.tamy
  );  
}

Sprite.prototype.desenharTiro = function(ctx){

  this.imageLib.drawImageTile(ctx,
    this.poses[this.pose].key,
    this.poses[this.pose].row,
    this.poses[this.pose].col + Math.floor(this.frame),
    64,
    this.x - this.tamx, this.y - this.tamy
  ); 
}

Sprite.prototype.desenharLimites = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(
    this.x - this.SIZE / 2,
    this.y - this.SIZE / 2 - 14,
    this.SIZE, this.SIZE
  );
  ctx.strokeStyle = "black";
  ctx.strokeRect(
    this.x - this.SIZE / 2,
    this.y - this.SIZE / 2 - 14,
    this.SIZE, this.SIZE
  );
};

Sprite.prototype.mover = function(dt) {
  this.x = this.x + this.vx * dt;
  this.y = this.y + this.vy * dt;
};

Sprite.prototype.moverOnMap = function(map, dt) {
  if(weap == 0) this.tiro-= 1.5 * dt;
  if(weap == 4) this.tiro-= 3 * dt;
  if(weap == 8) this.tiro-= 8 * dt;
  
  if (pc.pose == 10 && pc.tiro<= 0.5){
    pc.pose = 6;
  }else if (pc.pose == 11 && pc.tiro<= 0.5){
    pc.pose = 7;
  }else if (pc.pose == 8 && pc.tiro<= 0.5){
    pc.pose = 4;
  }else if (pc.pose == 9 && pc.tiro<= 0.5){
    pc.pose = 5;
  }

  this.frame += this.poses[this.pose].time * dt;
  if (this.frame > this.poses[this.pose].colMax + 1) {
    this.frame = this.poses[this.pose].col;
  }

  var pos = map.getIndices(this);
  this.vy += 220*dt;
  
  if (this.vx > 0 && map.cells[pos.l][pos.c + 1] == 1) {
    var dist = (pos.c + 1) * map.SIZE - (this.x + this.SIZE / 2);
    var mmax = Math.min(dist, this.vx * dt);
    this.x = this.x + mmax;
  } else if (this.vx < 0 && map.cells[pos.l][pos.c - 1] == 1) {
    var dist = (pos.c) * map.SIZE - (this.x - this.SIZE / 2);
    var mmax = Math.max(dist, this.vx * dt);
    this.x = this.x + mmax;
  } else {
    this.x = this.x + this.vx * dt;
  }

  if (this.vy > 0 && map.cells[pos.l + 1][pos.c] == 1) {
    var dist = (pos.l + 1) * map.SIZE - (this.y + this.SIZE / 2);
    var mmax = Math.min(dist, this.vy * dt);
    this.y = this.y + mmax;
    if(mmax==0) this.vy = 0;
  } else if (this.vy < 0 && map.cells[pos.l - 1][pos.c] == 1) {
    var dist = (pos.l) * map.SIZE - (this.y - this.SIZE / 2);
    var mmax = Math.max(dist, this.vy * dt);
    if(mmax==0) this.vy = 220*dt;
    this.y = this.y + mmax;
  } else {
    this.y = this.y + this.vy * dt;
  }
};


Sprite.prototype.persegue = function(alvo) {
  var dist = Math.sqrt(Math.pow(alvo.x - this.x, 2) + Math.pow(alvo.y - this.y, 2));
  this.vx = 40 * (alvo.x - this.x) / dist;
  if((alvo.y < this.y) && dist < 150 && this.vy == 0){
  this.vy -= 200;
  }
  if (Math.abs(this.vy) > Math.abs(this.vx)) {
    if (this.vy > 0) {
      this.pose = 1;
    } else {
      this.pose = 3;
    }
  } else {
    if (this.vx > 0) {
      this.pose = 0;
    } else {
      this.pose = 2;
    }
  }
};

Sprite.prototype.colidirCom = function(alvo){
  if(this.y+(this.SIZE/2) < alvo.y-(alvo.SIZE/2)) return false;
  if(this.y-(this.SIZE/2) > alvo.y+(alvo.SIZE/2)) return false;
  if(this.x+(this.SIZE/2) < alvo.x-(alvo.SIZE/2)) return false;
  if(this.x-(this.SIZE/2) > alvo.x+(alvo.SIZE/2)) return false;
  return true;
}