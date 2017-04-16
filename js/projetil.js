projeteis=[];

var createProjetil=function(pontoOrigem,pontoDestino,owner){
  _x=pontoOrigem.x;
  _y=pontoOrigem.y;
  _width=3;
  _height=3;
  _speed=15;
  _damage=3.5;

  calcularIncremento=function(){
    var catX=pontoDestino.x-pontoOrigem.x;
    var catY=pontoDestino.y-pontoOrigem.y;

    var _dist=Math.sqrt(catX*catX+catY*catY);

    incX=catX/_dist;
    incY=catY/_dist;
    return {
      x:incX,
      y:incY,
      dist:_dist
    }
  }
  _incremento=calcularIncremento();

  _update=function(){
    this.x+=this.incremento.x*this.speed;
    this.y+=this.incremento.y*this.speed;

    if(mapa.isSolid(ponto(this.x,this.y))){
      delete projeteis[projeteis.indexOf(this)];
    }
  }


  _renderizar=function(ctx){
    ctx.fillStyle='black';
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }

  _crash=function(){
    delete projeteis[projeteis.indexOf(this)]
  }

  return {
    width:_width,
    height:_height,
    x:_x,
    y:_y,
    speed:_speed,
    incremento:_incremento,
    update:_update,
    renderizar:_renderizar,
    crash:_crash,
    owner:owner,
    damage:_damage
  }
}
