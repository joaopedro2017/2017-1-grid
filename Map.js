function Map(l, c) {
  this.SIZE = 40;
  this.cells = [];
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
      switch(this.cells[i][j]) {
        case 0:
        ctx.fillStyle = 'black';
        ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
        break;
        case 1:
        ctx.fillStyle = 'brown';
        ctx.strokeStyle = 'tan';
        ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
        ctx.lineWidth = 3;
        ctx.strokeRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
        break;
        default: ctx.fillStyle = 'red';
        ctx.fillRect(j * this.SIZE, i * this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
};
