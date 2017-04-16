var createSoldier=function(team){
  spawn={};
  switch (team) {
    case 1:
        spawn.x=0;
        spawn.y=mapa.maxY;
        spawn._sprite=ponto(0,64);
        spawn.alvo=objetivo2;
      break;
    case 2:
        spawn.x=mapa.maxX;
        spawn.y=0;
        spawn._sprite=ponto(64,128);
        spawn.alvo=objetivo1;

      break;
    default:return;
  }

  var hp=100;

  speed=2;
  width=32;
  height=55;
  _fire=function(alvo){
    if(engine.frameNo>this.lastShot+10){
      projeteis.push(createProjetil(ponto(this.x+mapa.tsize/2,this.y+mapa.tsize/2),alvo,this));
      this.lastShot=engine.frameNo;
    }
  }

  _renderizar=function(ctx){
    cor='lightgreen';
    if(this.hp<2*hp/3){
      cor='yellow'
    }
    if(this.hp<hp/3){
      cor='red'
    }
    ctx.drawImage(atlas,this.sprite.x,this.sprite.y,mapa.tsize,mapa.tsize,this.x,this.y,mapa.tsize,mapa.tsize);
    ctx.fillStyle=cor;
    ctx.fillRect(this.x,this.y,(mapa.tsize/hp)*this.hp,5)
  };
  _isClearShot=function(){
    col=mapa.getCol(this.x);
    row=mapa.getRow(this.y);
    nxt=this.nextStep;
    notClear=false;
    caminhoRestante=this.caminhoOtimo
    if(col!=nxt.x){
      notClear=caminhoRestante.some(function(node){
                  return (row!=node.y)
                })

    }
    else{

      notClear=caminhoRestante.some(function(node){
                  return (col!=node.x)
                })

    }
    return !notClear;
  }
  _getCaminhoOtimo=function(){
    var minhasCoordenadas=ponto(mapa.getCol(this.x),mapa.getRow(this.y));
    this.alvo.coordenadas=ponto(mapa.getCol(this.alvo.x),mapa.getRow(this.alvo.y));
    var pathCell=function(x,y,counter){
      return {
        x:x,y:y,counter:counter
      }
    }
    var paths=[];
    paths.push(pathCell(this.alvo.coordenadas.x,this.alvo.coordenadas.y,0));

    var i=0
    while(true){
      var cell=paths[i];
      cell.descendentes=[];
      cell.descendentes.push(pathCell(cell.x+1,cell.y,i+1));
      cell.descendentes.push(pathCell(cell.x-1,cell.y,i+1));
      cell.descendentes.push(pathCell(cell.x,cell.y+1,i+1));
      cell.descendentes.push(pathCell(cell.x,cell.y-1,i+1));
      var encontrou=false;
      for(index=0;index<cell.descendentes.length;index++){
          node=cell.descendentes[index]
            if(node.x==minhasCoordenadas.x&&node.y==minhasCoordenadas.y){
              encontrou= true;
            }
            var jaExiste=paths.some(function(obj){
              return (obj.x==node.x&&obj.y==node.y)
            });

                if(!mapa.isSolid2(node)&&!jaExiste&&!mapa.isForaDoMapa(node)){
                        node.pai=cell;
                        paths.push(node)

                }

                delete cell.descendentes[index];
                if(encontrou){
                  break;
                }


      };

      i++;
      if(encontrou){
        break;
      }
    };

    var nextStep=paths.pop();
    var caminhoOtimo=[];
    while(true){
      caminhoOtimo.push(nextStep);
      if(nextStep.pai){
        nextStep=nextStep.pai
      }else{
        break;
      }
    }

    return caminhoOtimo;
  }
  _update=function(){
    if(this.alvo.isDead){
      this.alvo=this.spawn.alvo;
    }
    if(this.caminhoOtimo===undefined||this.alvoX!=mapa.getCol(this.alvo.x)||this.alvoY!=mapa.getRow(this.alvo.y)){
      this.caminhoOtimo=this.getCaminhoOtimo().slice(1);
      this.clearShot=false;
    }
    if(this.nextStep===undefined){
        this.nextStep=this.caminhoOtimo.shift();

        this.clearShot=this.isClearShot();
    }
    if(this.clearShot){
      this.fire(this.alvo)
      this.clearShot=this.isClearShot()
      return;
    }

    if(this.nextStep.dirX===undefined){
      this.nextStep.dirX=(this.nextStep.x*mapa.tsize-this.x)/mapa.tsize;
      this.nextStep.dirY=(this.nextStep.y*mapa.tsize-this.y)/mapa.tsize;
    }
    this.nextStep.distanciaX=this.nextStep.x*mapa.tsize-this.x;
    this.nextStep.distanciaY=this.nextStep.y*mapa.tsize-this.y

    if(Math.abs(this.nextStep.distanciaX)<=0&&Math.abs(this.nextStep.distanciaY)<=0){
      this.nextStep=undefined;
    }else{
        this.x+=this.nextStep.dirX*this.speed;
        this.y+=this.nextStep.dirY*this.speed;
    }

    soldiers.forEach(function(sold){
      if(sold===this){
        return
      }
      this.caminhoOtimo.forEach(function(node){
        var col=mapa.getCol(sold.x);
        var row=mapa.getRow(sold.y);
        if(node.x==col&&node.y==row){
          this.alvo=sold;
          this.caminhoOtimo=undefined
        }
      }.bind(this))
    }.bind(this))


    this.alvoX=mapa.getCol(this.alvo.x);
    this.alvoY=mapa.getRow(this.alvo.y);
  }
  _onCrash=function(projetil){
    this.hp-=projetil.damage
    console.log(this.hp);
    if(this.hp<=0){
      this.isDead=true
      delete soldiers[soldiers.indexOf(this)]
      setTimeout(function(){
        this.x=this.spawn.x;
        this.y=this.spawn.y;
        this.hp=hp;
        this.sprite=this.spawn._sprite;
        this.caminhoOtimo=undefined;
        this.nextStep=undefined;
        this.isDead=false
        soldiers.push(this);
      }.bind(this),3000);
    }
  }

_up=function(){
  this.y-=this.speed;
}
_down=function(){
  this.y+=this.speed;
}
_right=function(){
  this.x+=this.speed;
}
_left=function(){
  this.x-=this.speed;
}


  return {
    x:spawn.x,
    y:spawn.y,
    width:width,
    height:height,
    speed:speed,
    sprite:spawn._sprite,
    renderizar:_renderizar,
    update:_update,
    fire:_fire,
    onCrash:_onCrash,
    hp:hp,
    team:team,
    moveUp:_up,
    moveDown:_down,
    moveLeft:_left,
    moveRight:_right,
    alvo:spawn.alvo,
    getCaminhoOtimo:_getCaminhoOtimo,
    isClearShot:_isClearShot,
    spawn:spawn,
    lastShot:0
  }
}
