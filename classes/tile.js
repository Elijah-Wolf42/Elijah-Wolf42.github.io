class Tile {
    constructor(x, y, width=64, height=64) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.img = null
        this.isObstacle = false
    }

    draw() {
        image(this.img, this.x * this.width, this.y * this.height)
    }
}