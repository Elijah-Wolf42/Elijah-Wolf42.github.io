class Ship {
    static SHIP_SPEED = 2.5
    static MAX_X = null
    static MAX_Y = null
    static GRID_SIZE = null

    constructor(x, y, max_x, max_y, grid_size) {
        this.x = x 
        this.y = y
        this.img = loadImage('/assets/ship.gif')

        Ship.MAX_X = max_x
        Ship.MAX_Y = max_y
        Ship.GRID_SIZE = grid_size
    }
    
    move() {
        if (keyIsDown(LEFT_ARROW) && this.x > Ship.GRID_SIZE / 2)    { this.x -= Ship.SHIP_SPEED }
        if (keyIsDown(RIGHT_ARROW) && this.x + Ship.GRID_SIZE / 2 < Ship.MAX_X) { this.x += Ship.SHIP_SPEED }
        if (keyIsDown(DOWN_ARROW) && this.y + Ship.GRID_SIZE / 2 < Ship.MAX_Y) { this.y += Ship.SHIP_SPEED }
        if (keyIsDown(UP_ARROW) && this.y > Ship.GRID_SIZE / 2)    { this.y -= Ship.SHIP_SPEED }
    }
    
    draw() {
        imageMode(CENTER);
        image(this.img, this.x, this.y, 64, 86)
        imageMode(CORNER)
        this.move()
    }

    getCoordinates() {
        return [
            Math.floor(this.x / Ship.GRID_SIZE),
            Math.floor(this.y / Ship.GRID_SIZE),
        ]
    }

    resetCoordinates(x) {
        this.x = x
    }
}