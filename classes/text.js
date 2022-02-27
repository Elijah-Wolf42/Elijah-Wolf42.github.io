class Text {
    static NUM_TEXT_FILES = 7
    static IMAGE_FILES = []
    static MESSAGE_DELAY = 150
    static FADE_FINISH_VALUE = 255
    static NEPTUNE_IMAGE
    static WHOOSH_IMAGE

    constructor() {
        Text.IMAGE_FILES = this.populateImages()
        this.currentIndex = 0
        this.fadeTimer = 0
        this.messageDelta = 0
        this.fadingIn = false
        Text.NEPTUNE_IMAGE = loadImage('/assets/text/neptune.png') 
        Text.WHOOSH_IMAGE = loadImage('/assets/text/whoosh.png')
        Text.NEPTUNE_SOUND_1 = loadSound('/assets/music/conversation.mp3')
        Text.NEPTUNE_SOUND_2 = loadSound('/assets/music/neptune_2.wav')
        Text.WHOOSH_SOUND = loadSound('/assets/music/whoosh.wav')
        Text.ENTER_IMAGE = loadImage('/assets/enter.png')
    }

    populateImages() {
        const images = []
        for (let i = 0; i < Text.NUM_TEXT_FILES; i++) {
            const img = loadImage(`/assets/text/text_${i + 1}.gif`)
            images.push(img)
        }
        return images
    }

    draw() {
        image(Text.IMAGE_FILES[this.currentIndex], 15, 300, 0, 200)
        image(Text.ENTER_IMAGE, 472, 425, 125, 50)
        this.messageDelta += 1;

        if (!Text.NEPTUNE_SOUND_1.isPlaying()) {
            Text.NEPTUNE_SOUND_1.setVolume(0)
            Text.NEPTUNE_SOUND_1.play()
            Text.NEPTUNE_SOUND_1.setVolume(0.75, 3.0)
        }

        if (this.currentIndex === Text.NUM_TEXT_FILES - 1) {
            image(Text.WHOOSH_IMAGE, 70, 0, 500, 300)
        } else {
            image(Text.NEPTUNE_IMAGE, 170, 0, 300, 300)
        }

        if (!this.canSkipMessage()) return

        if (keyIsPressed && keyCode === ENTER) {
            if (this.currentIndex === Text.NUM_TEXT_FILES - 2) {
                if (!Text.NEPTUNE_SOUND_2.isPlaying()) {
                    Text.NEPTUNE_SOUND_2.setVolume(0.6)
                    Text.NEPTUNE_SOUND_2.play()
                }
                Text.NEPTUNE_SOUND_1.stop()
            } else if (this.currentIndex === Text.NUM_TEXT_FILES - 1) {
                if (!Text.WHOOSH_SOUND.isPlaying()) {
                    Text.WHOOSH_SOUND.setVolume(0.4)
                    Text.WHOOSH_SOUND.play()
                }
            }
            if (this.isOnLastTextMessage()) {
                // play woosh
                this.fadingIn = true
            } else {
                this.messageDelta = 0
                this.currentIndex += 1
            }
        }
        
        if (this.fadingIn) {
            background(255 - this.fadeTimer)
        
            if (this.fadeTimer < Text.FADE_FINISH_VALUE) {
                this.fadeTimer += 1
            }

            if (this.isTextFinished()) {
                Text.NEPTUNE_SOUND_1.setVolume(0, 3.0)
            }
        }
    }

    canSkipMessage() {
        return this.messageDelta >= Text.MESSAGE_DELAY
    }

    isOnLastTextMessage() {
        return this.currentIndex >= Text.NUM_TEXT_FILES - 1
    }

    isTextFinished() {
        return this.fadeTimer >= Text.FADE_FINISH_VALUE
    }
}