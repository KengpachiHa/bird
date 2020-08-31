export const Draw:any = {}
// const canvas = null
import qq from './imgs/qq.jpeg'
let birdCtx, backCtx, birdCanvas, bacCanvas,
    X
const qqImage = new Image()
qqImage.src = qq

Draw.init = (bird, bac) => {
  birdCanvas = bird
  bacCanvas = bac

  birdCtx = birdCanvas.getContext('2d')
  backCtx = bacCanvas.getContext('2d')

  birdCtx.fillStyle = 'red';
  backCtx.fillStyle = 'blue';

  X = birdCanvas.width / 3
  birdCtx.drawImage(qqImage, X, birdCanvas.height / 2, 20, 20)
}

Draw.bird = (position) => {
  
  clearLastBird()
  
  birdCtx.drawImage(qqImage, position[0], position[1], 20, 20)
  // birdCtx.beginPath();
  // birdCtx.arc(X, Y, 10, 0, Math.PI * 2)
  // birdCtx.fill()
}

Draw.block = (arr) => {
  clearBackground()
  arr.forEach(blockArr => {
    blockArr.forEach(block => {
      backCtx.beginPath();
      block.forEach(ele => {
        backCtx.lineTo(...ele)
      })
      backCtx.closePath();
      backCtx.fill();
    })
  });
}

function clearLastBird() {
  birdCtx.clearRect(0, 0, birdCanvas.width, birdCanvas.height)
}

function clearBackground () {
  backCtx.clearRect(0, 0, birdCanvas.width, birdCanvas.height)
}