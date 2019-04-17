$(function(event){

  $("#start-but").on("click", function(){
    $("#logo")[0].className = "start";
    $("#tag")[0].className = "start";
    $("#start-but")[0].className = "start";
    $("header")[0].className = "header";
    document.querySelector("#myInput").focus();
    setTimeout(function(){
      game();
    }, 1000);
  });

  $("#retry").on("click", function(){
    $("#g-logo")[0].className = "start";
    $("#g-tag")[0].className = "start";
    $("#score-tag")[0].className = "start";
    $("#score")[0].className = "start";
    $("#retry")[0].className = "start";
    $("header")[0].className = "header";
    score = 0;
    $(".score")[0].innerHTML = score;
    healthLost = $(".health-lost");
    for (i = 0; i < healthLost.length; i++){
      healthLost[i].className = "col-md-1 healthbar";
      console.log($(".healthbar"));
    }
    document.querySelector("#myInput").focus();
    setTimeout(function() {
      for (var i = 0; i < enemies.length; i++) {
        enemies[i].className = "enemy-dead";
        enemies[i].id = "enemy" + i;
        words[i].className = "word-dead";
        words[i].id = "word" + i;
      }

      game();
    }, 1000)
  });

  function gameOver() {
    $("#g-logo")[0].className = "";
    $("#g-tag")[0].className = "";
    $("#score-tag")[0].className = "";
    $("#score")[0].className = "";
    $("#retry")[0].className = "";
    $("header")[0].className = "start";
    console.log(score);
    $("#score")[0].innerHTML = score;
  };

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
      stopTimer0();
      stopTimer1();
      stopTimer2();
      stopTimer3();
      stopTimer();
      for (i = 0; i < enemies.length; i++){
        enemies[i].id = "game-over";
        words[i].id = "game-over";
      }
      gameOver();
    };
  };


  function enemyDur(i, j) {
    if (i == 0){
      enemy0 = enemies[0];
      word0 = words[0];
      timer0 = setTimeout(function(){
        enemy0.className = "enemy-dead";
        word0.className = "word-dead";
        word0.innerHTML = "";
        console.log(word0.innerHTML);
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
        word1.innerHTML = "";
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
        word2.innerHTML = "";
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
        word3.innerHTML = "";
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
      word.innerHTML = wordSelect();
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
          word = document.querySelector("#word" + i);
          console.log(word.innerHTML);
          if (word.innerHTML == myInput.val()){
            console.log("yes");
            if(i == 0){
              enemy0.className = "enemy-dead";
              word0.className = "word-dead";
              stopTimer0();
              score += word.innerHTML.length * 10;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 1){
              enemy1.className = "enemy-dead";
              word1.className = "word-dead";
              stopTimer1();
              score += word.innerHTML.length * 10;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 2){
              enemy2.className = "enemy-dead";
              word2.className = "word-dead";
              stopTimer2();
              score += word.innerHTML.length * 10;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            }
            else if(i == 3){
              enemy3.className = "enemy-dead";
              word3.className = "word-dead";
              stopTimer3();
              score += word.innerHTML.length * 10;
              scoreDisp.innerHTML = score;
              initEnemy(i,2,4);
            };
          };
        };
        document.querySelector("#myInput").value = "";
      };
    });
  };

  function wordSelect() {
    var words = ["star", "wars", "jedi", "sith","lightsaber","luke","leia","han","vader","emperor","rebel","empire","falcon","anakin","endor","hoth","lando","chewie","r2d2","c3po", "darth","xwing","tie","clone","boba","jango","jabba","ewok","wampa","jawa","gungan","bespin","yavin","naboo","kamino","grievous","dooku","obiwan","maul","yoda","bothan","kylo","rey","finn","poe","jakku","snoke","revan","katarn","asajj","thrawn"];
    var selector = Math.floor(Math.random() * words.length);
    return words[selector];
  }

});
