var ship = document.getElementById("ship");
var board = document.getElementById("board");


window.addEventListener("keydown", (e)=> {
    var left = parseInt(window.getComputedStyle(ship).getPropertyValue("left"));
    if(e.key == "ArrowLeft" && left > 0){
        ship.style.left = left - 10 + "px";
    }
    else if(e.key == "ArrowRight" && left <= 460){
        ship.style.left = left + 10 + "px";
    }

    if(e.key == "ArrowUp" || e.keyCode == 70){
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);

        

        var moveBullet = setInterval(() => {

            var enemies = document.getElementsByClassName("enemies")

            for (var i = 0; i < enemies.length; i++) {
                var enemie = enemies[i];

                var enemiesBound = enemie.getBoundingClientRect();
                var bulletBound = bullet.getBoundingClientRect();

                if (bulletBound.left >= enemiesBound.left && 
                    bulletBound.right <= enemiesBound.right &&
                    bulletBound.top <= enemiesBound.top &&
                    bulletBound.bottom <= enemiesBound.bottom) 
                {
                    enemie.parentElement.removeChild(enemie);

                    document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML) +5;
                }
            }

            var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));

            if (bulletBottom >= 500) {
                clearInterval(moveBullet)
            }

            bullet.style.left = left + "px";
            bullet.style.bottom = bulletBottom + 3 + "px";
        });
    }
});

var generateEnemies = setInterval(() => {
    var enemies = document.createElement("div");
    enemies.classList.add("enemies");
    var enemiesLeft = parseInt(window.getComputedStyle(enemies).getPropertyValue("left"));

    enemies.style.left = Math.floor(Math.random() * 450) + "px";

    board.appendChild(enemies);
}, 1500);

var moveEnemies = setInterval(() => {
    var enemies = document.getElementsByClassName("enemies");

    if(enemies != undefined){
        for(var i = 0; i < enemies.length; i++){
            var enemie = enemies[i];
            var enemiesTop = parseInt(window.getComputedStyle(enemie).getPropertyValue("top"));

            if (enemiesTop >= 475) {
                alert("Juego Terminado");
                clearInterval(moveEnemies);
                window.location.reload();
            }

            enemie.style.top = enemiesTop + 25 + "px";
        }
    }
}, 400);