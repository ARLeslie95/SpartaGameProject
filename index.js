$(function(event){
  function game() {
    enemies = $(".enemy-dead");
    words = $(".word-dead");
    health = $(".healthbar");
    healthNo = 6;
    scoreDisp = $(".score")[0];
    score = 0;
    var timer;
    var timer0;
    var timer1;
    var timer2;
    var timer3;
    enemyGen();
    inputCheck();
  };

  function healthCheck(i) {

    if (i <= 0) {
      stopTimer();
      stopTimer0();
      stopTimer1();
      stopTimer2();
      stopTimer3();
      for (i = 0; i < enemies.length; i++){
        enemies[i].className = "enemy-dead";
        words[i].className = "word-dead";
      }
      console.log("You dead");
    };
  };



  // function enemyDur(x, y){
  //   timer1 = setTimeout(function(){
  //     enemy = enemies[x];
  //     enemy.className = "enemy-dead";
  //     word = words[x];
  //     word.className = "word-dead";
  //   }, 3500 + 500*y);
  // };

  function enemyDur(i, j) {
    if (i == 0){
      enemy0 = enemies[0];
      word0 = words[0];
      timer0 = setTimeout(function(){
        enemy0.className = "enemy-dead";
        word0.className = "word-dead";
        console.log("enemy 0 shoots");
        healthNo--;
        initEnemy(i, j, j);
        healthCheck(healthNo);
        health[healthNo].className = "health-lost";
      }, 5000 + 500*j);
    }
    else if (i == 1){
      enemy1 = enemies[1];
      word1 = words[1];
      timer1 = setTimeout(function(){
        enemy1.className = "enemy-dead";
        word1.className = "word-dead";
        console.log("enemy 1 shoots");
        healthNo--;
        initEnemy(i, j, j);
        healthCheck(healthNo);
        health[healthNo].className = "health-lost";
      }, 5000 + 500*j);
    }
    else if (i == 2){
      enemy2 = enemies[2];
      word2 = words[2];
      timer2 = setTimeout(function(){
        enemy2.className = "enemy-dead";
        word2.className = "word-dead";
        console.log("enemy2 shoots");
        healthNo--;
        initEnemy(i, j, j);
        healthCheck(healthNo);
        health[healthNo].className = "health-lost";
      }, 5000 + 500*j);
    }
    else if (i == 3){
      enemy3 = enemies[3];
      word3 = words[3];
      timer3 = setTimeout(function(){
        enemy3.className = "enemy-dead";
        word3.className = "word-dead";
        console.log("enemy3 shoots");
        healthNo--;
        initEnemy(i, j, j)
        healthCheck(healthNo);
        health[healthNo].className = "health-lost";
      }, 5000 + 500*j);
    };
  }

  function stopTimer() {
    clearTimeout(timer);
  };
  function stopTimer0() {
    clearTimeout(timer0);
  };
  function stopTimer1() {
    clearTimeout(timer1);
  };
  function stopTimer2() {
    clearTimeout(timer2);
  };
  function stopTimer3() {
    clearTimeout(timer3);
  };



  function initEnemy(i,j,z) {
    timer = setTimeout(function(){
      enemy = enemies[i];
      enemy.className = "enemy" + i;
      word = words[i];
      word.className = "word" + i;
      // console.log("Enemy " + i + " has appeared");
      // console.log(enemy);
    },1000 + 1000*j);
    enemyDur(i,z);
  };

  function enemyGen() {
    tme = -1;
    for (var i = 0; i < enemies.length; i++){
      tme++;
      initEnemy(i,tme,tme);
    };
  };


  function inputCheck() {
    var myInput = $("#myInput");
    myInput.keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13'){
        for (i = 0; i < words.length; i++){
          if (words[i].innerHTML == myInput.val()){
            console.log("yes");
            if(i == 0){
              enemy0.className = "enemy-dead";
              word0.className = "word-dead";
              stopTimer0();
              score += 50;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 1){
              enemy1.className = "enemy-dead";
              word1.className = "word-dead";
              stopTimer1();
              score += 50;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 2){
              enemy2.className = "enemy-dead";
              word2.className = "word-dead";
              stopTimer2();
              score += 50;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 3){
              enemy3.className = "enemy-dead";
              word3.className = "word-dead";
              stopTimer3();
              score += 50;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            };
          };
        };
        document.querySelector("#myInput").value = "";
      };
    });
  };

  // enemyGen();
  // inputCheck();
  game();



});
