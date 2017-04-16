var engine={
  start:function(){
    this.context=document.getElementById('canvas').getContext('2d');
    this.interval=setInterval(function(){
      this.update();
    }.bind(this),20);
  },
  update:function(){
    this.frameNo+=1;
    this.pausado=false;
    ctx=this.context;

    ctx.clearRect(0,0,1024,384);

    tela.renderizar(ctx);
    projeteis.forEach(function(proj){
      proj.update();
      proj.renderizar(ctx);

      proj.didCrash(objetivo1);
      proj.didCrash(objetivo2);
      soldiers.forEach(function(sold){
        if(proj.owner===sold) return;
        proj.didCrash(sold);
      })
    })
    objetivo1.renderizar(ctx);
    objetivo2.renderizar(ctx);

    soldiers.forEach(function(soldier){
      soldier.update()
      soldier.renderizar(ctx);
    })


    if(controle.getKeys()[27]){
      clearInterval(this.interval);
      ctx.font="30px Arial";
      ctx.strokeText("Pausado",50,50);
    }


  },
  stop:function(){
    clearInterval(this.interval)
  },
  frameNo:0
};
var atlas=new Image();
atlas.src="atlas.png";
soldiers=[]
var mapa=createMapa()
var tela =createTela()
var controle=createControle();

var objetivo1=spawnObjetivo(ponto(0,0));
var objetivo2=spawnObjetivo(ponto(mapa.maxX,mapa.maxY));
soldiers.push(createSoldier(1));
soldiers.push(createSoldier(2));
soldiers[0].update=playerControle;
engine.start();
