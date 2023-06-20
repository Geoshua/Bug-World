class Cell extends Sprite {
    constructor(x, y, markers = [], imageSrc) {

        super({imageSrc: imageSrc, animations: null});
        this.x = x; // x coordinate of the cell
        this.y = y; // y coordinate of the cell
        this.obstructed = false; // indicates if the cell is obstructed or not
        this.bug = null; // the bug occupying the cell (null if unoccupied)
        this.food = 0; // the amount of food in the cell
        this.markers = markers; // an array of markers set by bugs on this cell
        this.position = {x: x, y: y};
    }

    isObstructed() {
        return this.obstructed;
    }

    isOccupied() {
        return this.bug !== null;
    }

    getBug() {
        if (!this.isOccupied()) {
            throw new Error("Cannot get bug at an unoccupied cell.");
        }
        return this.bug;
    }

    getFood() {
        return this.food;
    }

    getMarkers() {
        return this.markers;
    }

    hasMarker(marker, color) {
        return this.markers.some((m) => m.marker === marker && m.color === color);
    }

    addMarker(marker, color) {
        this.markers.push({marker, color});
    }

    removeMarker(marker, color) {
        this.markers = this.markers.filter(
            (m) => !(m.marker === marker && m.color === color)
        );
    }

    getAdjacentBugs(color) {
        const directions = [0, 1, 2, 3, 4, 5];
        return directions.reduce((count, direction) => {
            const neighbor = this.getNeighbor(direction);
            if (neighbor && neighbor.isOccupied() && neighbor.getBug().color !== color) {
                return count + 1;
            }
            return count;
        }, 0);
    }

    matches(condition, color) {
        if (condition.type === "obstructed") {
            return this.isObstructed();
        }
        if (condition.type === "has-food") {
            return this.getFood() > 0;
        }
        if (condition.type === "has-marker") {
            return this.hasMarker(condition.marker, color);
        }
        if (condition.type === "marker-set") {
            const markers = this.getMarkers();
            return markers.some((m) => m.color === color && m.marker >= condition.min && m.marker <= condition.max);
        }
        return false;
    }

    getNeighbor(direction) {
        const parity = this.y % 2;
        const dx = [0, 1, 1, 0, -1, -1][parity ? direction : (direction + 5) % 6];
        const dy = [-1, -1, 0, 1, 0, -1][parity ? direction : (direction + 5) % 6];
        const x = this.x + dx;
        const y = this.y + dy;
        return this.world.getCell(x, y);
    }

    setFood(amount) {
        this.food = amount;
    }

    removeFood() {
        this.food = 0;
    }

    setBug(bug) {
        if (this.isObstructed) {
            throw new Error('Cannot place bug on obstructed cell');
        }
        if (this.isOccupied()) {
            throw new Error('Cannot place bug on occupied cell');
        }
        this.bug = bug;
        bug.setPosition(this.x, this.y);
    }

    removeBug() {
        if (!this.isOccupied()) {
            throw new Error('Cannot remove bug from unoccupied cell');
        }
        const bug = this.bug;
        this.bug = null;
        bug.setPosition(null, null);
        return bug;
    }
}
  