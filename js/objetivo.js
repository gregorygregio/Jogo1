var spawnObjetivo=function(ponto,owner){
  width=mapa.tsize;
  height=mapa.tsize;
  _hp=1000;
  _onCrash=function(projetil){
    if(projetil.owner.alvo!==this){
      console.log('nigga !u hit your own shit')
      return
    }
    this.hp-=projetil.damage

    if(this.hp<=0){
      engine.stop()
    }
  }

  _renderizar=function(ctx){
    var cor="lightgreen";
    if(this.hp<700){
      cor='yellow';
    }
    if(this.hp<400){
      cor="red"
    }
    ctx.fillStyle=cor;
    ctx.fillRect(this.x,this.y+this.height/2,(this.width/_hp)*this.hp,5);
  }
  return {
    x:ponto.x,
    y:ponto.y,
    height:height,
    width:width,
    hp:_hp,
    onCrash:_onCrash,
    renderizar:_renderizar,
    owner:owner
  }

}
