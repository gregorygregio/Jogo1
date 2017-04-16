createTela=function(){



    return {

            renderizar:function(ctx){
              for(c=0;c<mapa.cols;c++){
                for(r=0;r<mapa.rows;r++){
                  ctx.drawImage(atlas,0,0,mapa.tsize,mapa.tsize,c*mapa.tsize,r*mapa.tsize,mapa.tsize,mapa.tsize);
                  tile=mapa.getTile(c,r);
                  if(tile!=0){
                    tileY=Math.floor((tile/4))*mapa.tsize;
                    tileX=((tile%4))*mapa.tsize;
                    ctx.drawImage(atlas,tileX,tileY,mapa.tsize,mapa.tsize,c*mapa.tsize,r*mapa.tsize,mapa.tsize,mapa.tsize);
                  }

                }
              }

            }



    };
}
