class World {

    canMove(x, y) {
        for (let i = 0; i < this.cells.length; i++) {
            if (this.cells[i].obstructed) {
                if (this.cells[i].x <= x && x <= this.cells[i].x + 60 && this.cells[i].y <= y && y <= this.cells[i].y + 60) {
                    return false;
                }
            }
        }
        return true;
    }

    constructor(height, width, worldContent) {
        this.height = height;
        this.width = width;
        this.map = new Array(height);
        for (let i = 0; i < height; ++i) {
            this.map[i] = new Array(width);
            for (let j = 0; j < width; ++j) {
                let c = worldContent[i * width + j];
                switch (c) {
                    case '#':
                        this.map[i][j] = new WorldCell(true, 0, null);
                        break;
                    case '.':
                        this.map[i][j] = new WorldCell(false, 0, null);
                        break;
                    case '-':
                        this.map[i][j] = new WorldCell(false, 0, Colors.BLACK);
                        break;
                    case '+':
                        this.map[i][j] = new WorldCell(false, 0, Colors.RED);
                        break;
                    default:
                        this.map[i][j] = new WorldCell(false, parseInt(c, 10), null);
                        break;
                }
            }
        }
    }

    cellAt(i, j) {
        return this.map[i][j];
    }

}

const DIRECTIONS = {
    LEFT: [-1, 0],
    RIGHT: [1, 0],
    UP: [0, 1],
    DOWN: [0, -1],
    UP_RIGHT: [1, 1],
    UP_LEFT: [-1, 1],
};

const COLORS = {
    RED: 1,
    BLACK: 2,
};

const COLOR_NAMES = {
    [COLORS.RED]: 'Red',
    [COLORS.BLACK]: 'Black',
};
