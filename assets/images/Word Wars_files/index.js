$(function(event){
  enemies = $(".enemy-dead");
  words = $(".word-dead");
  health = $(".healthbar");
  healthNo = 6;
  scoreDisp = $(".score")[0];
  score = 0;

  function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  };

  function enemy(i) {
    this.class = "enemy";
    this.init_timer = ""
    this.dur_timer = ""
    this.enemy = enemies[i];
    this.word = words[i];
    this.stagger = i;

    // this.dur = function(j){
    //   dur_timer = setTimeout(function(){
    //     enemy.className = "enemy-dead";
    //     word.className = "enemy-dead";
    //     word.innerHTML = "";
    //     healthNo-- ;
    //     healthCheck(healthNo);
    //     health[healthNo].className = "health-lost" ;
    //   }, 5000 + 500*j)
    // };

    this.stopTimer = function(){
      clearTimeout(this.init_timer);
      clearTimeout(this.dur_timer);
    }
  };
  var enemy00 = new enemy(0);
  var enemy01 = new enemy(1);
  var enemy02 = new enemy(2);
  var enemy03 = new enemy(3);
  enemyObj = [enemy00, enemy01, enemy02, enemy03];

  function enemyInit(i) {
    var enemyOb = enemyObj[i];
    // var stagger = enemyOb.stagger;
    enemyOb.init_timer = setTimeout(function(){
      enemyOb.enemy.className = this.class;
      enemyOb.word.className = this.class;
      enemyOb.word.innerHTML = wordSelect();
      enemyDur(i)
    }, 1000 + 1000*enemyOb.stagger);
  };

  function enemyGen() {
    for (var i = 0; i < enemies.length; i++){
      enemyInit(i)
      // enemy00.init(0);
      // enemy01.init(1);
      // enemy02.init(2);
      // enemy03.init(3);
      // initEnemy(i,tme,tme);
    };
  };

  function enemyDur(i) {
    var enemy = enemies[i];
    var word = words[i];
    var enemyOb = enemyObj[i];

    enemyOb.dur_timer = setTimeout(function(){
      enemyOb.enemy.className = "enemy-dead";
      enemyOb.word.className = "enemy-dead";
      enemyOb.word.innerHTML = "";
      healthNo -= 1 ;
      healthCheck(healthNo);
      health[healthNo].className = "health-lost";
      enemyInit(i);
    }, 5000 + 1000*enemyOb.stagger);
    // if (i == 0){
      //   enemy0 = enemies[0];
      //   word0 = words[0];
      //   timer0 = setTimeout(function(){
        //     laser = new sound("assets/sounds/laser.mp3");
        //     laser.play();
        //     enemy0.className = "enemy-dead";
        //     word0.className = "word-dead";
        //     word0.innerHTML = "";
        //     healthNo--;
        //     initEnemy(i, j, j);
        //     healthCheck(healthNo);
        //     health[healthNo].className = "health-lost";
        //   }, 5000 + 500*j);
        // }
        // else if (i == 1){
          //   enemy1 = enemies[1];
          //   word1 = words[1];
          //   timer1 = setTimeout(function(){
            //     laser = new sound("assets/sounds/laser.mp3");
            //     laser.play();
            //     enemy1.className = "enemy-dead";
            //     word1.className = "word-dead";
            //     word1.innerHTML = "";
            //     healthNo--;
            //     initEnemy(i, j, j);
            //     healthCheck(healthNo);
            //     health[healthNo].className = "health-lost";
            //   }, 5000 + 500*j);
            // }
            // else if (i == 2){
              //   enemy2 = enemies[2];
              //   word2 = words[2];
              //   timer2 = setTimeout(function(){
                //     laser = new sound("assets/sounds/laser.mp3");
                //     laser.play();
                //     enemy2.className = "enemy-dead";
                //     word2.className = "word-dead";
                //     word2.innerHTML = "";
                //     healthNo--;
                //     initEnemy(i, j, j);
                //     healthCheck(healthNo);
                //     health[healthNo].className = "health-lost";
                //   }, 5000 + 500*j);
                // }
                // else if (i == 3){
                  //   enemy3 = enemies[3];
                  //   word3 = words[3];
                  //   timer3 = setTimeout(function(){
                    //     laser = new sound("assets/sounds/laser.mp3");
                    //     laser.play();
                    //     enemy3.className = "enemy-dead";
                    //     word3.className = "word-dead";
                    //     word3.innerHTML = "";
                    //     healthNo--;
                    //     initEnemy(i, j, j)
                    //     healthCheck(healthNo);
                    //     health[healthNo].className = "health-lost";
                    //   }, 5000 + 500*j);
                    // };
  };


  function game() {
    var timer;
    var timer0;
    var timer1;
    var timer2;
    var timer3;
    enemyGen();
    inputCheck();
  };



  $("#start-but").on("click", function(){
    $("#logo")[0].className = "start";
    $("#tag")[0].className = "start";
    $("#start-but")[0].className = "start";
    $("header")[0].className = "header";
    theme = new sound("assets/sounds/theme.mp3");
    theme.play();
    document.querySelector("#myInput").focus();
    setTimeout(function(){
      theme.stop();
      game();
    }, 2500);
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
    healthNo = 6;
    for (i = 0; i < healthLost.length; i++){
      healthLost[i].className = "col-md-1 healthbar";
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
    lose = new sound("assets/sounds/lose.mp3");
    lose.play();
    $("#g-logo")[0].className = "";
    $("#g-tag")[0].className = "";
    $("#score-tag")[0].className = "";
    $("#score")[0].className = "";
    $("#retry")[0].className = "";
    $("header")[0].className = "start";
    $("#score")[0].innerHTML = score;
  };


  function healthCheck(i) {

    if (i <= 0) {
      // stopTimer0();
      // stopTimer1();
      // stopTimer2();
      // stopTimer3();
      // stopTimer();
      console.log("yo");
      for (var i = 0; i < enemies.length; i++){
        enemies[i].id = "game-over";
        words[i].id = "game-over";
        enemyObj[i].stopTimer();
      }
      gameOver();
    };
  };



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
    },1000 + 1000*j);
    enemyDur(i,z);
  };



  function inputCheck() {
    myInput = $("#myInput");
    myInput.keypress(function (event) {
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if (keycode == '13'){
        document.querySelector("#myInput").value = "";
        for (i = 0; i < 4; i++){
          var enemyOb = enemyObj[i];
          console.log(enemyOb.word.innerHTML);
          console.log(myInput.val());
          if (enemyOb.word.innerHTML == myInput.val()){
            console.log("hit");
          }
          // if (enemyOb.word.innerHTML == myInput.val()){
          //   enemies[i].className = "enemy-dead";
          //   words[i].className = "enemy-dead";
          //   enemyObj[i].stopTimer();
          //   score += enemyObj[i].word.innerHTML.length * 10;
          // }
          // word = document.querySelector("#word" + i);
          // if (word.innerHTML == myInput.val()){
          //   explosion = new sound("assets/sounds/explosion.mp3")
          //   explosion.play();
          //   if(i == 0){
          //     enemy0.className = "enemy-dead";
          //     word0.className = "word-dead";
          //     stopTimer0();
          //     score += word.innerHTML.length * 10;
          //     scoreDisp.innerHTML = score;
          //     initEnemy(i,2,4);
          //   }
          //   else if(i == 1){
          //     enemy1.className = "enemy-dead";
          //     word1.className = "word-dead";
          //     stopTimer1();
          //     score += word.innerHTML.length * 10;
          //     scoreDisp.innerHTML = score;
          //     initEnemy(i,2,4);
          //   }
          //   else if(i == 2){
          //     enemy2.className = "enemy-dead";
          //     word2.className = "word-dead";
          //     stopTimer2();
          //     score += word.innerHTML.length * 10;
          //     scoreDisp.innerHTML = score;
          //     initEnemy(i,2,4);
          //   }
          //   else if(i == 3){
          //     enemy3.className = "enemy-dead";
          //     word3.className = "word-dead";
          //     stopTimer3();
          //     score += word.innerHTML.length * 10;
          //     scoreDisp.innerHTML = score;
          //     initEnemy(i,2,4);
          //   };
          // };
        };
      };
    });
  };

  function wordSelect() {
    var words = ["star", "wars", "jedi", "sith","lightsaber","luke","leia","han","vader","emperor","rebel","empire","falcon","anakin","endor","hoth","lando","chewie","r2d2","c3po", "darth","xwing","tie","clone","boba","jango","jabba","ewok","wampa","jawa","gungan","bespin","yavin","naboo","kamino","grievous","dooku","obiwan","maul","yoda","bothan","kylo","rey","finn","poe","jakku","snoke","revan","katarn","asajj","thrawn"];
    var selector = Math.floor(Math.random() * words.length);
    return words[selector];
  }

});
