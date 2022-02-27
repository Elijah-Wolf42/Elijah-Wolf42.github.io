class GameOver {
    constructor() {
        this.img = loadImage('/assets/game_over.png')
        this.reset = false
        this.showScreen = false
        this.isGameOver = false
        this.sound = loadSound('/assets/music/death.wav')
    }

    draw() {
        image(this.img, 0, 0, 650, 512)

        if (!this.sound.isPlaying() && !this.isGameOver) {
            this.sound.setVolume(0.5)
            this.sound.play()
            this.isGameOver = true
        }
        
        if (mouseIsPressed) {
            if (this.isHoveringReset()) {
                this.reset = true
            } else if (this.isHoveringTitle()) {
                this.showScreen = true
            }
        }
    }

    isHoveringReset() {
        return (mouseX >= 215 && mouseX <= 415 && mouseY >= 240 && mouseY <= 340)
    }

    isHoveringTitle() {
        return (mouseX >= 215 && mouseX <= 415 && mouseY >= 375 && mouseY <= 475)
    }
}