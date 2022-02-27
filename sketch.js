let ship
let grid
let text
let title
let gameover
let stormSound
let successSound
let hasPlayedSuccess = false
const WIDTH = 640
const HEIGHT = 512

function preload() {
    stormSound = loadSound('/assets/music/storm.mp3')
    stormSound.playMode('restart')
    lobbySound = loadSound('/assets/music/lobby.mp3')
    lobbySound.playMode('restart')
    lobbySound.setVolume(0.7)
    successSound = loadSound('/assets/music/success.wav')

    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }

    grid = new Grid()
    grid.setTileMap()
}

function setup() {
    createCanvas(WIDTH, HEIGHT)
    reset()
    title = new Title()
}

function draw() {
    background(220)
    let shipCoordinates = ship.getCoordinates()
    if (title.showScreen) {
        title.draw()

        if (!lobbySound.isPlaying()) {
            lobbySound.setVolume(0.7)
            lobbySound.play()
        }
    }
    else if (grid.checkFinished(...shipCoordinates) && !text.isTextFinished()) {
        text.draw()

        if(!successSound.isPlaying() && !hasPlayedSuccess) {
            successSound.play()
            hasPlayedSuccess = true
        }

        stormSound.setVolume(0, 0.6)
        stormSound.stop()
    } else {
        if (grid.checkCollision(ship.x, ship.y) || text.isTextFinished()) {
            gameover.draw()
            stormSound.stop()
        } else {
            grid.draw()
            ship.draw()

            if (grid.isMapComplete(...shipCoordinates) && !grid.checkFinished(...shipCoordinates)) {
                ship.resetCoordinates(30)
                grid.changeMap()
            }

            if (!stormSound.isPlaying()) {
                stormSound.setVolume(0.5, 0.5)
                stormSound.play()
            } 

            if (lobbySound.isPlaying()) {
                lobbySound.setVolume(0, 0.5)
                lobbySound.stop()
            }
        }
    }

    if (gameover.reset) {
        reset()
    } else if (gameover.showScreen) {
        title.showScreen = true
        title.counter = 0
        reset()
    }
}

function reset() {
    grid = new Grid()
    ship = new Ship(32, 288, WIDTH, HEIGHT, 64)
    text = new Text()
    gameover = new GameOver()
    hasPlayedSuccess = false
}