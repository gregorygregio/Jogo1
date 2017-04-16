var ponto=function(x,y){
  return {
    x:x,
    y:y
  }
}

var getCoordinates=function(obj){
  var right=obj.x+obj.width;
  var bottom=obj.y+obj.height;
  var left=obj.x;
  var top=obj.y;

  return {
    right:right,
    bottom:bottom,
    left:left,
    top:top
  }
}
Object.prototype.crash=function(){

}
Object.prototype.onCrash=function(){

}
Object.prototype.didCrash=function(otherobj){
    var coordenada1=getCoordinates(this);
    var coordenada2=getCoordinates(otherobj);


    if(coordenada1.right<coordenada2.left||coordenada1.bottom<coordenada2.top
      ||coordenada1.left>coordenada2.right||coordenada1.top>coordenada2.bottom){
        return;
      }

      this.crash();
      otherobj.onCrash(this);
}
