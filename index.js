function start_page(){
  enemies = $(".enemy-dead");
  words = $(".word-dead");
  health = $(".healthbar");
  healthNo = 6;
  scoreDisp = $(".score")[0];
  score = 0;
};

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
  this.stagger = (Math.random()*3);
  this.stopTimer = function(){
    clearTimeout(this.init_timer);
    clearTimeout(this.dur_timer);
  }
};

function enemyInit(i) {
  var enemyOb = enemyObj[i];
  // var stagger = enemyOb.stagger;
  enemyOb.init_timer = setTimeout(function(){
    enemyOb.enemy.className = this.class;
    enemyOb.word.className = this.class;
    enemyOb.word.innerHTML = wordSelect();
    enemyDur(i)
  }, 1000 + (enemyOb.stagger*1000));
};

function wordSelect() {
  var words = ["star", "wars", "jedi", "sith","lightsaber","luke","leia","han","vader","emperor","rebel","empire","falcon","anakin","endor","hoth","lando","chewie","r2d2","c3po", "darth","xwing","tie","clone","boba","jango","jabba","ewok","wampa","jawa","gungan","bespin","yavin","naboo","kamino","grievous","dooku","obiwan","maul","yoda","bothan","kylo","rey","finn","poe","jakku","snoke","revan","katarn","asajj","thrawn"];
  var selector = Math.floor(Math.random() * words.length);
  return words[selector];
};

function enemyGen() {
  for (var i = 0; i < enemies.length; i++){
    enemyInit(i)
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
    laser = new sound ("assets/sounds/laser.mp3")
    laser.play();
    enemyInit(i);
  }, 4000 + 1000*enemyOb.stagger);

};

function healthCheck(i) {

  if (i <= 0) {
    for (var i = 0; i < enemies.length; i++){
      enemies[i].id = "game-over";
      words[i].id = "game-over";
      enemyObj[i].stopTimer();
    }
    gameOver();
  };
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
      for (i = 0; i < 4; i++){
        var enemyOb = enemyObj[i];
        if (myInput.val() == enemyOb.word.innerHTML) {
          explosion = new sound("assets/sounds/explosion.mp3")
          explosion.play();
          enemies[i].className = "enemy-dead";
          words[i].className = "enemy-dead";
          enemyOb.stopTimer();
          enemyInit(i);
          score += words[i].innerHTML.length * 10;
          scoreDisp.innerHTML = score;
        };
      };
      document.querySelector("#myInput").value = "";

      };
    });
  };


function stat_reset() {
  $("#logo")[0].className = "start";
  $("#tag")[0].className = "start";
  $("#start-but")[0].className = "start";
  $("header")[0].className = "header";
  $("#g-logo")[0].className = "start";
  $("#g-tag")[0].className = "start";
  $("#score-tag")[0].className = "start";
  $("#score")[0].className = "start";
  $("#retry")[0].className = "start";
  score = 0;
  $(".score")[0].innerHTML = score;
  healthNo = 6;
  for (i = 0; i < health.length; i++){
    health[i].className = "col-md-1 healthbar";
  }
  document.querySelector("#myInput").focus();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].className = "enemy-dead";
    enemies[i].id = "enemy" + i;
    words[i].className = "word-dead";
    words[i].id = "word" + i;
  }
}

function game() {
  enemyGen();
  inputCheck();
};

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
  $("#myInput").val("");
};

$(function(event){

  start_page()

  var enemy00 = new enemy(0);
  var enemy01 = new enemy(1);
  var enemy02 = new enemy(2);
  var enemy03 = new enemy(3);
  enemyObj = [enemy00, enemy01, enemy02, enemy03];



  $("#start-but").on("click", function(){
    stat_reset()
    theme = new sound("assets/sounds/theme.mp3");
    theme.play();
    setTimeout(function(){
      theme.stop();
      game();
    }, 2500);
  });

  $("#retry").on("click", function(){
    stat_reset()
    setTimeout(function() {
      game();
    }, 1000)
  });
});
