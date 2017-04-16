var createMapa=function(){
    _cols=16;
    _rows=6;
    _tsize=64;


    _maxX=(_cols*_tsize)-_tsize;
    _maxY=(_rows*_tsize)-_tsize;
      return {
        cols:_cols,
        rows:_rows,
        tsize:_tsize,
        maxX:_maxX,
        maxY:_maxY,
        tiles:[
          2,3,0,3,0,0,0,0,0,0,0,0,0,0,0,0,
          0,3,0,0,0,3,0,0,0,0,3,0,0,3,0,3,
          0,0,0,0,0,0,0,3,3,0,0,0,0,3,0,0,
          0,0,3,0,0,3,0,0,0,0,3,0,0,0,0,0,
          3,0,3,0,0,3,0,0,0,0,3,0,0,0,3,0,
          0,0,0,0,0,0,0,0,0,0,0,0,3,0,3,1
        ],
        getTile:function(col,row){
          return this.tiles[row*this.cols+col];
        },
        getCol:function(x){
          return Math.floor(x/this.tsize);
        },
        getRow:function(y){
          return Math.floor(y/this.tsize)
        },
        isSolid:function(ponto){
          col=this.getCol(ponto.x);
          row=this.getRow(ponto.y);
          tile=this.getTile(col,row);
          return (tile!==0)
        },
        isSolid2:function(ponto){
          tile=this.getTile(ponto.x,ponto.y);
          return (tile!==0)
        },
        isForaDoMapa:function(ponto){
          return (ponto.x<0||ponto.y<0)
        }
      }
}
