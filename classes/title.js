class Title {
    static BUTTON_TIMER = 5

    constructor() {
        this.img = loadImage('/assets/title.png')
        this.sound = loadSound('/assets/music/lobby.mp3');
        this.showScreen = true
        this.counter = 0
    }

    draw() {
        image(this.img, 0, 0, 640, 512)
        
        if (this.isHoveringButton() && mouseIsPressed && this.counter >= Title.BUTTON_TIMER) {
            this.showScreen = false
            this.counter = 0
            this.sound.stop()
        }
        this.counter += 1
    }

    isHoveringButton() {
        return (mouseX >= 210 && mouseX <= 420 && mouseY >= 325 && mouseY <= 425)
    }
}