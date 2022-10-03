const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  isDown: false,
  x: null,
  y: null,
}

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener("mousedown", () => {
  mouse.isDown = true
})

window.addEventListener("mouseup", () => {
  mouse.isDown = false
})

const circleArray = []
const colorArray = ["#7EFFDB", "#B693FE", "#8C82FC", "#FF9DE2"]

const maxRadius = 100
const maxDistance = 100

function Circle(x, y, dx, dy, radius) {
  this.x = x
  this.y = y

  this.dx = dx
  this.dy = dy

  this.radius = radius
  this.minRadius = radius

  const randomColorIndex = Math.floor(Math.random() * colorArray.length)
  this.color = colorArray[randomColorIndex]

  this.draw = function () {
    context.beginPath()
    context.fillStyle = this.color
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }

  this.update = function () {
    if (this.x - this.radius <= 0 || this.x + this.radius >= window.innerWidth) {
      this.dx = -this.dx
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= window.innerHeight) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy

    if (
      mouse.isDown &&
      mouse.x - this.x < maxDistance &&
      mouse.x - this.x > -maxDistance &&
      mouse.y - this.y < maxDistance &&
      mouse.y - this.y > -maxDistance
    ) {
      if (this.radius <= maxRadius) this.radius += 5
    } else if (this.radius >= this.minRadius) this.radius -= 5

    this.draw()
  }
}

for (let i = 0; i < 1000; i++) {
  var radius = Math.max(10, Math.random() * 20)

  var x = Math.random() * (innerWidth - radius * 2) + radius
  var y = Math.random() * (innerHeight - radius * 2) + radius

  var dx = Math.random() - 0.5
  var dy = Math.random() - 0.5

  circleArray.push(new Circle(x, y, dx, dy, radius))
}

function animate() {
  requestAnimationFrame(animate)
  context.clearRect(0, 0, window.innerWidth, window.innerHeight)
  for (let i = 0; i < circleArray.length; i++) circleArray[i].update()
}

animate()
