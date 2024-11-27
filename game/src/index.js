import Player from "./class/Player.js";
import Projectile from "./class/Projectile.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = innerHeight;
ctx.imageSmoothingEnabled = false

const player = new Player(canvas.width, canvas.height);
const playerBullets = []// a logica de disparos do player estão dentro da class/player.js



const keys = {
  left: false,
  right: false,
  shoot: {
    pressed: false,
    released: true
  },
};

const drawBullet = () => {
  playerBullets.forEach((projectile) => {
    projectile.draw(ctx);
    projectile.updateBullet()
    
  })
}

const clearBullets = ()=>{
  playerBullets.forEach((projectile, index) => {
    if (projectile.position.y <=0) {
      playerBullets.splice(index,1)
    }
  })
}

const gameLoop = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(playerBullets);
  
  drawBullet()
  clearBullets()

  ctx.save();// obs1: salvamos o ctx

  ctx.translate(
    player.position.x + player.width / 2,
    player.position.y + player.height / 2
  ); //obs2: rotacionamos o player

  if (keys.shoot.pressed && keys.shoot.released) {
    player.shoot(playerBullets)
    keys.shoot.released = false
    console.log(playerBullets);
    
  }
  
  if (keys.left && player.position.x >= 0) {
    player.moveLeft()
    ctx.rotate(-0.40)/* rotaciona e desloca 
    porem desloca o contexto inteiro 
    a partir do ponto 00 do contexto "ctx"
    é como se fosse uma folha de papel girando 
    tendo como ponto central de rotação é uma das extremidade
    
    para lidar com isso nos: 
    1 primeiro salvamos o ctx como na obs:1
    2 então damos o comando para que o player "nave"
      rotacione no proprio eixo
    3 Nesse momento o player some da tela, mas não se assuste 
      pois é normal afinal de contas enviamos a nave 
      para um local onde não podemos ver
      é então que restauramos o position do contexto
      que salvamos como primeiro passo
      éssa é a 3observação que fica acima do player.draw(ctx)
      nós negativamos os valores passados em ROTATE e ele restaura 
      a posição inicial 
    4 e apostendo feito o passo tres vereficamos que a nave rotaciona 
      porem ela nao se movimenta para os lados é onde restauramos o contexto
      com o comando restores fechando assim o ciclo e utilizando o save
      fazendo isso logo abaixo do comando de desenho do contexto
      que é player.draw(ctx)
  */
    }
  if (keys.right && player.position.x <= canvas.width - player.width) {
    player.moveRight()
    ctx.rotate(0.40)
  } 

  ctx.translate(
    - player.position.x - player.width / 2,
    - player.position.y - player.height / 2
  ); //obs3: rotacionamos o player

  
  player.draw(ctx)

  ctx.restore()

  requestAnimationFrame(gameLoop)

}

addEventListener("keydown", (e) => {
  const key = e.key.toLocaleLowerCase()
  
  if (key === "a") keys.left = true;
  if (key === "d") keys.right = true;
  if (key === "enter") keys.shoot.pressed = true;
  
}) 

addEventListener("keyup", (e) => {
  const key = e.key.toLocaleLowerCase()
  
  if (key === "a") keys.left = false;
  if (key === "d") keys.right = false;
  if (key === "enter") {
    keys.shoot.pressed = false
    keys.shoot.released = true
  }
  
}) 

gameLoop()