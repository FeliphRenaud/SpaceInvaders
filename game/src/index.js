import Player from "./class/Player.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth;
canvas.height = innerHeight;
ctx.imageSmoothingEnabled = false

const player = new Player(canvas.width, canvas.height)

const keys = {
  left: false,
  right: false,
};

const gameLoop = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  if (keys.left && player.position.x >= 0) player.moveLeft()
  if (keys.right && player.position.x <= canvas.width - player.width) 
    player.moveRight()
  
  player.draw(ctx)

  requestAnimationFrame(gameLoop)

}

addEventListener("keydown", (e) => {
  const key = e.key.toLocaleLowerCase()
  
  if (key === "a") keys.left = true 
  if (key === "d") keys.right = true
  
}) 

addEventListener("keyup", (e) => {
  const key = e.key.toLocaleLowerCase()
  
  if (key === "a") keys.left = false
  if (key === "d") keys.right = false  
  
}) 

gameLoop()