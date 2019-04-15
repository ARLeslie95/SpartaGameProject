$(function(event){
 enemies = $(".enemy-dead");
 words = $(".word-dead");

  function enemyDur(x, y){
    timer1 = setTimeout(function(){
      enemy = enemies[x];
      enemy.className = "enemy-dead";
      word = words[x];
      word.className = "word-dead";
    }, 3500 + 500*y);
  };



  function initEnemy(i, j) {
    timer = setTimeout(function(){
      enemy = enemies[i];
      enemy.className = "enemy" + i;
      word = words[i];
      word.className = "word" + i;
      // console.log("Enemy " + i + " has appeared");
      // console.log(enemy);
    },1000 + 500*j);
    enemyDur(i, j);
  };

  function enemyRndm() {
    for (var i = 0; i < 6; i++){
      var n1 = Math.floor(Math.random() * enemies.length);
      var n2 = Math.floor(Math.random() * 7);
      // console.log(n1 ,n2);
      timer3 = initEnemy(n1,n2);
    timer2 = setTimeout(function(){
      for (var i = 0; i < enemies.length; i++){
        if(enemies[i].className == "enemy-dead"){
          var n2 = Math.floor(Math.random() * 3);
          // console.log(i + "corrected." + n2);
          initEnemy(i, n2);
        };
      };
    }, 3500);
    };
  }

  function inputCheck() {
    var myInput = $("#myInput");
    myInput.on("input", function () {
      console.log($("#myInput").val());
      for (i = 0; i < words.length; i++){
        if (words[i].innerHTML == myInput.val()){
          clearTimeout(timer1);
        };
      };
    });
  };

  enemyRndm();
  inputCheck();




});
