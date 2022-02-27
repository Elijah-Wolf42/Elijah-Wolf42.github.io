class Obstacle extends Tile {
    constructor(...args) {
        super(...args)
        this.img = loadImage('/assets/whirlpool.gif')
        this.isObstacle = true
    }   
}