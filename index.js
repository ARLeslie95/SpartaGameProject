$(function(event){

  function initEnemy(i, j) {
    timer = setTimeout(function(){
      enemy = enemies[i]
      enemy.className = "enemy" + i;
      console.log("Enemy " + i + " has appeared");
    },1000 + 500*j);

  };

  function enemyRndm() {
    enemies = $(".enemy-dead");
    for (var i = 0; i < 4; i++){
      var n1 = Math.floor(Math.random() * enemies.length);
      var n2 = Math.floor(Math.random() * 7);
      console.log(n1 ,n2);
      initEnemy(n1,n2);
    timer = setTimeout(function(){
      for (var i = 0; i < enemies.length; i++){
        if(enemies[i].className == "enemy-dead"){
          var n2 = Math.floor(Math.random() * 7);
          console.log(i + "corrected." + n2);
          initEnemy(i, n2);
        };
      };
    }, 6000);
    };
  }

  enemyRndm();


});
