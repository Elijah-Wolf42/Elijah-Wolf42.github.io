class Grid {
    static TILE_MAP = []

    static TILE_MAPPING = {
        0: Water,
        1: Whirlpool,
        2: Crag,
    }
    
    static TILE_MAP_IDS = [
        [
            [2, 0, 1, 0, 0, 0, 0, 0, 1, 0,],
            [0, 0, 0, 0, 0, 0, 2, 0, 1, 0,],
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 2,],
            [0, 0, 0, 0, 2, 0, 0, 1, 0, 0,],
            [0, 0, 0, 0, 1, 0, 2, 0, 0, 0,],
            [0, 0, 0, 2, 0, 0, 0, 2, 0, 2,],
            [0, 1, 0, 0, 2, 0, 0, 1, 2, 2,],
            [0, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
        ],
        [
            [2, 0, 0, 0, 0, 2, 2, 2, 2, 1,],
            [2, 0, 0, 0, 0, 0, 2, 0, 1, 1,],
            [0, 2, 0, 0, 0, 0, 0, 0, 0, 2,],
            [0, 0, 0, 0, 2, 0, 0, 1, 0, 2,],
            [0, 0, 0, 0, 1, 1, 2, 1, 0, 0,],
            [1, 0, 0, 0, 0, 0, 0, 2, 0, 2,],
            [2, 1, 0, 0, 2, 0, 0, 1, 2, 2,],
            [0, 0, 0, 1, 1, 0, 0, 0, 2, 1,],
        ],
        [
            [2, 1, 0, 0, 0, 2, 1, 2, 2, 1,],
            [2, 1, 0, 1, 0, 2, 0, 0, 1, 1,],
            [2, 2, 0, 2, 0, 2, 0, 0, 0, 0,],
            [0, 0, 0, 1, 0, 2, 0, 1, 0, 2,],
            [0, 0, 1, 2, 0, 1, 0, 2, 0, 2,],
            [0, 0, 1, 1, 0, 1, 0, 2, 0, 2,],
            [0, 1, 0, 0, 0, 0, 0, 0, 2, 2,],
            [0, 0, 0, 1, 1, 1, 1, 0, 2, 1,],
        ],
    ]

    static NUM_END_TILES = 1

    constructor() {
        this.currentMap = 0
    }

    setTileMap() {
        Grid.TILE_MAP = this.setupTileMap()
    }

    setupTileMap() {
        const tileMap = []
        for (let i = 0; i < Grid.TILE_MAP_IDS.length; i++) {
            const tiles = []
            Grid.TILE_MAP_IDS[i].forEach((row, y) => {
                const tileRow = []
                row.forEach((tileId, x) => {
                    const tile = new Grid.TILE_MAPPING[tileId](x, y)
                    tileRow.push(tile)
                })
                tiles.push(tileRow)
            })
            tileMap.push(tiles)
        }
        return tileMap
    }
    
    draw() {
        for (const row of Grid.TILE_MAP[this.currentMap]) {
            for (const tile of row) {
                tile.draw()
            }
        }
    }

    checkCollision(x, y) {
        const affectedTiles = this.getAffectedTiles(x, y)
        for (const [x_i, y_i] of affectedTiles) {
            if (Grid.TILE_MAP[this.currentMap][y_i][x_i].isObstacle) {
                return true
            }
        }
        return false
    }

    getAffectedTiles(x, y) {
        const affectedTiles = []
        let xPos = x / 64, yPos = y/64
        let xTile = Math.floor(xPos), yTile = Math.floor(yPos)
        let xDecimal = xPos - xTile, yDecimal = yPos - yTile

        affectedTiles.push([xTile, yTile])
        if (xDecimal >= 0.85) {
            let xValue = xTile + 1 < Grid.TILE_MAP[this.currentMap][0].length - 1 ? xTile + 1 : Grid.TILE_MAP[this.currentMap][0].length - 1
            affectedTiles.push([xValue, yTile])
        }
        else if (xDecimal <= 0.15) { 
            let xValue = xTile - 1 >= 0 ? xTile - 1 : 0
            affectedTiles.push([xValue, yTile])
        }

        if (yDecimal >= 0.85) { 
            let yValue = yTile + 1 < Grid.TILE_MAP[this.currentMap].length - 1 ? yTile + 1 : Grid.TILE_MAP[this.currentMap].length - 1
            affectedTiles.push([xTile, yValue])
        }
        else if (yDecimal <= 0.15) { 
            let yValue = yTile - 1 >= 0 ? yTile - 1 : 0
            affectedTiles.push([xTile, yValue])
        }

        return affectedTiles
    }

    changeMap() {
        if (this.currentMap < Grid.TILE_MAP_IDS.length - 1) {
            this.currentMap += 1
        }
    }

    isMapComplete(x) {
        return (x === Grid.TILE_MAP_IDS[0].length + 1)
    }

    checkFinished(x) {
        return (this.isMapComplete(x) && this.currentMap === Grid.TILE_MAP_IDS.length - 1)
    }
}