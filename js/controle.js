
var createControle=function(){
  _keys={};
  _ponto=[];
  window.addEventListener('keydown',function(e){
    _keys[e.keyCode]=true;
  })
  window.addEventListener('keyup',function(e){
    delete _keys[e.keyCode];
  });
  window.addEventListener('mousedown',function(e){
    this.interval=setInterval(function(){
          _ponto.push(ponto(this.mouseX,this.mouseY))
    },20)
  })
  window.addEventListener('mouseup',function(e){
    clearInterval(this.interval)
  })
  window.addEventListener('mousemove',function(e){
    this.mouseX=e.offsetX;
    this.mouseY=e.offsetY;
  })
  return{
    getKeys:function(){return _keys},
    getMouseDown:function(){return _ponto.shift()}
  }
}

var playerControle=function(){
  var tiro=controle.getMouseDown()
  if(tiro){
    this.fire(tiro);
  }
  keys=controle.getKeys();
  xAnterior=this.x;
  yAnterior=this.y;
  if(keys[65]) this.moveLeft();
  if(keys[68]) this.moveRight();
  if(keys[83]) this.moveDown();
  if(keys[87]) this.moveUp();


  var right_top=ponto(this.x+mapa.tsize/2,this.y+10);
  var right_bottom=ponto(this.x+mapa.tsize/2,this.y+mapa.tsize-5);
  var left_top=ponto(this.x+10,this.y+10);
  var left_bottom=ponto(this.x+10,this.y+mapa.tsize-5);

  if(mapa.isSolid(right_top)||mapa.isSolid(right_bottom)
  ||mapa.isSolid(left_bottom)||mapa.isSolid(left_top)
  ||this.x<0||this.y<0||this.x>mapa.maxX||this.y>mapa.maxY){
    this.x=xAnterior;
    this.y=yAnterior;
  }
}
