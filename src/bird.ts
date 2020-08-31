import { Draw } from './bird.draw'
const STOP          = 'stop'
const PAUSED        = 'paused'
const FLYING        = 'Flying'

const blockWidth = 60
const blockGap = 120

let CanvasHeight  =  null

let birdFlyInverval  = null
let blockRunInterval = null

function Bird (birdCanvas, backCanvas) {
  this.status = STOP
  this.position = []
  this.bacgroundArr = []
  this.g = 9.7
  this.birdCanvas = birdCanvas
  this.backCanvas = backCanvas
}

Bird.prototype.init = function() {
  this.status = STOP
  this.position = []
  this.bacgroundArr = []
  const width = this.birdCanvas.width
  const height = this.birdCanvas.height
  CanvasHeight = height

  this.position = [ width / 2, height / 2 ]
  this.blockInit(this.backCanvas)
  Draw.init(this.birdCanvas, this.backCanvas)
}

Bird.prototype.fly = function() {

  console.log(`bird's position`, this.position)
  console.log(`block arr`, this.bacgroundArr)

  if(this.status != FLYING) {
    blockGoRun.call(this)
  }
  birdGoFly.call(this)
  
}

Bird.prototype.blockInit = function (canvas) {
  console.log('blockInit')
  const width = canvas.width
  const height = canvas.height
  const initBlock = [
    [width, 0],
    [width + blockWidth, 0],
    [width + blockWidth, 178],
    [width, 178],
    [width, 0]
  ]
  this.bacgroundArr = [creatNextBlock([initBlock], height)]
  const minLength = Math.ceil(width / (blockWidth + blockGap))
  for (let i = 0; i < minLength; i++) {
    const lastBlock = this.bacgroundArr[this.bacgroundArr.length - 1]
    this.bacgroundArr.push(creatNextBlock(lastBlock, height))
  }
}

function birdGoFly () {
  clearInterval(birdFlyInverval)
  let t = 1
  let y = this.position[1]
  birdFlyInverval = setInterval(() => {
    y += (0.5 * this.g * t * t  - 11.5 * t)
    t += 0.15
    this.position[1] = y
    Draw.bird(this.position)
  }, 50)
  this.status = FLYING
}

function blockGoRun() {
  const bac = this.bacgroundArr
  
  const blockrun = () => {
    blockRunInterval = setInterval(() => {
      if(bac[0][0][1][0] < 0){
        clearInterval(blockRunInterval)
        const lastBlock = bac[bac.length - 1]
        bac.shift()
        bac.push(creatNextBlock(lastBlock, this.backCanvas.height))
        blockrun()
        return
      }
      
      bac.forEach(a => {
        a.forEach((ele) => {
          ele.forEach(e => {
            e[0] -= 10
          })
        })
      })
      Draw.block(bac)
    }, 100)
  }

  blockrun()
}


function creatNextBlock(currentBlock, height) {
  const baseHeight = CanvasHeight / 4
  const gapHeight  = CanvasHeight / 5
  // console.log('CanvasHeight', CanvasHeight, gapHeight)
  const currentStart = currentBlock[0][0][0]
  const startX = currentStart + blockWidth + blockGap
  const randomGap =  Math.floor(Math.random() * gapHeight)
  const topBlockY = baseHeight + randomGap
  const top = [
    [startX,                      0],
    [startX + blockWidth,         0],
    [startX + blockWidth, topBlockY],
    [startX,              topBlockY],
  ]
  const bottom = [
    [startX,                             height],
    [startX + blockWidth,                height],
    [startX + blockWidth, topBlockY + gapHeight],
    [startX,              topBlockY + gapHeight],
  ]
  return [top, bottom]
}

Bird.prototype.pause = function () {
  console.log('spause fly')
  clearInterval(birdFlyInverval)
  clearInterval(blockRunInterval)
  this.status = PAUSED
}

export  { Bird }
